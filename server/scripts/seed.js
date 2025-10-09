import { db } from '../src/lib/db.js';
import bcrypt from 'bcryptjs';

async function seed() {
  await db.read();
  db.data = {
    profile: { username: 'alandrelisboa90', status: 'Ambitious' },
    users: [
      {
        id: 'u1',
        email: 'demo@example.com',
        username: 'demo',
        passwordHash: await bcrypt.hash('password123', 10),
      },
    ],
    questions: [
      { id: 'q1', title: 'What is photosynthesis?', createdAt: new Date().toISOString() },
      { id: 'q2', title: 'Solve x^2 - 5x + 6 = 0', createdAt: new Date().toISOString() },
    ],
    notes: [
      { id: 'n1', title: 'Chapter 3 Summary', content: 'Key takeaways...', createdAt: new Date().toISOString() },
    ],
  };
  await db.write();
  // eslint-disable-next-line no-console
  console.log('Seed complete');
}

seed();


