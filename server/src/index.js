import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';

import { db } from './lib/db.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/auth', authRouter);

const PORT = process.env.PORT || 4000;

// Health
app.get('/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

// Notes
app.get('/notes', async (req, res) => {
  const notes = db.data.notes || [];
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const { title, content } = req.body || {};
  if (!title || !content) return res.status(400).json({ error: 'title and content required' });
  const id = randomUUID();
  const note = { id, title, content, createdAt: new Date().toISOString() };
  db.data.notes.push(note);
  await db.write();
  res.status(201).json(note);
});

// Questions
app.get('/questions', async (req, res) => {
  res.json(db.data.questions || []);
});

// Profile (stub)
app.get('/profile', async (req, res) => {
  res.json(db.data.profile || { username: 'guest' });
});

// Serve static (optional)
app.use('/data', express.static(join(process.cwd(), 'server', 'data')));

app.listen(PORT, async () => {
  await db.read();
  db.data ||= { notes: [], questions: [], profile: { username: 'guest' } };
  await db.write();
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});


