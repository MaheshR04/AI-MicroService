import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from '../interfaces.js';
import MongoBaseRepository from './baseRepository.js';
import { JWT_SECRET } from '../../config/index.js';

class MongoAuthRepository extends AuthRepository {
  constructor() {
    super();
    this.store = new MongoBaseRepository('users');
  }

  async register(userDetails = {}) {
    const { name, email, password, role, company, title } = userDetails;

    if (!email || !password) {
      const err = new Error('Email and password are required.');
      err.statusCode = 400;
      throw err;
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await this.store.collection.findOne({ email: cleanEmail });

    if (existing) {
      const err = new Error(`An account with email "${email}" already exists.`);
      err.statusCode = 409;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password.trim(), salt);
    const userRole = (role || 'agent').toLowerCase();

    const newUser = {
      userId: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: (name || 'Enterprise User').trim(),
      email: cleanEmail,
      passwordHash,
      role: userRole,
      title: (title || (userRole === 'manager' ? 'Operations Manager' : 'Support Specialist')).trim(),
      company: (company || 'Enterprise Client').trim(),
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    await this.store.collection.insertOne(newUser);

    const token = jwt.sign(
      { userId: newUser.userId, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const sanitized = this.store.withoutMongoId(newUser);
    delete sanitized.passwordHash;

    return {
      user: sanitized,
      token
    };
  }

  async login(credentials = {}) {
    const { email, password } = credentials;

    if (!email || !password) {
      const err = new Error('Email and password are required.');
      err.statusCode = 400;
      throw err;
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await this.store.collection.findOne({ email: cleanEmail });

    if (!user) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password.trim(), user.passwordHash || '');
    if (!isMatch) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const sanitized = this.store.withoutMongoId(user);
    delete sanitized.passwordHash;

    return {
      user: sanitized,
      token
    };
  }
}

export default MongoAuthRepository;
