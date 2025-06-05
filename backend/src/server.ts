// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs/promises';

const app = express();
app.use(cors());                     // allow the React front-end later
const PORT = 4000;                   // choose any free port

// tiny helper to read JSON files from stub-data
async function readTable(table: string) {
  const file = path.join(
    import.meta.dirname,
    'provider',
    'stub-data',
    `${table}.json`
  );
  const rows = JSON.parse(await fs.readFile(file, 'utf8'));
  return { table, rows, version: Date.now().toString() };
}

// GET /data/sales_data  →  returns your demo rows
app.get('/data/:table', async (req, res) => {
  try {
    const data = await readTable(req.params.table);
    res.json(data);
  } catch {
    res.status(404).json({ error: 'unknown table' });
  }
});

app.listen(PORT, () => console.log(`REST API ready on http://localhost:${PORT}`));
