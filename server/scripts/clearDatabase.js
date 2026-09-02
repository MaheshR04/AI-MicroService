import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function clearDatabase() {
  if (!MONGO_URI) {
    console.error('MONGO_URI not found in .env');
    process.exit(1);
  }

  console.log(`Connecting to MongoDB Atlas to purge dummy data...`);
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  const collections = await db.listCollections().toArray();
  console.log(`Found ${collections.length} collections.`);

  for (const col of collections) {
    const colName = col.name;
    const count = await db.collection(colName).countDocuments();
    await db.collection(colName).deleteMany({});
    console.log(`🧹 Purged collection "${colName}": Deleted ${count} records.`);
  }

  console.log('✅ ALL DUMMY DATA PURGED SUCCESSFULLY! Database is now completely clean and ready for original testing data.');
  await mongoose.disconnect();
}

clearDatabase().catch(err => {
  console.error('Error clearing database:', err);
  process.exit(1);
});
