import { AuthRepository } from '../interfaces.js';

class InMemoryAuthRepository extends AuthRepository {
  constructor() {
    super();
    this.users = [];
  }

  async register(userDetails = {}) {
    const { name, email, password, role, company, title } = userDetails;
    const cleanEmail = (email || '').trim().toLowerCase();

    const existing = this.users.find(u => u.email === cleanEmail);
    if (existing) {
      const err = new Error(`An account with email "${email}" already exists.`);
      err.statusCode = 409;
      throw err;
    }

    const userRole = (role || 'agent').toLowerCase();
    const newUser = {
      userId: `usr_${Date.now()}`,
      name: (name || 'Enterprise User').trim(),
      email: cleanEmail,
      password: (password || '').trim(),
      role: userRole,
      title: (title || (userRole === 'manager' ? 'Operations Manager' : 'Support Specialist')).trim(),
      company: (company || 'Enterprise Client').trim(),
      status: 'ACTIVE',
      createdAt: new Date().toISOString()
    };

    this.users.push(newUser);

    return {
      user: {
        userId: newUser.userId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        title: newUser.title,
        company: newUser.company,
        status: newUser.status,
        createdAt: newUser.createdAt
      },
      token: `dev_token_${newUser.userId}`
    };
  }

  async login(credentials = {}) {
    const { email, password } = credentials;
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = this.users.find(u => u.email === cleanEmail && u.password === (password || '').trim());

    if (!user) {
      const err = new Error('Invalid email or password.');
      err.statusCode = 401;
      throw err;
    }

    return {
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title,
        company: user.company,
        status: user.status,
        createdAt: user.createdAt
      },
      token: `dev_token_${user.userId}`
    };
  }
}

export default InMemoryAuthRepository;
