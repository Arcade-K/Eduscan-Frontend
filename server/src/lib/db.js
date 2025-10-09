import { JSONFilePreset } from 'lowdb/node';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';

const dataDir = join(process.cwd(), 'server', 'data');
mkdirSync(dataDir, { recursive: true });
const file = join(dataDir, 'db.json');

export const db = await JSONFilePreset(file, { notes: [], questions: [], profile: {} });


