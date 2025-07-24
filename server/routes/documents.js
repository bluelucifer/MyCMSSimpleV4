const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const marked = require('marked');

const DATA_FILE = path.join(__dirname, '../data.json');

function readDocuments() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (e) {
    return [];
  }
}

function writeDocuments(docs) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(docs, null, 2));
}

let idCounter = (() => {
  const docs = readDocuments();
  return docs.length > 0 ? Math.max(...docs.map(d => d.id)) + 1 : 1;
})();

// 문서 목록 조회
router.get('/', (req, res) => {
  res.json(readDocuments());
});

// 문서 단일 조회
router.get('/:id', (req, res) => {
  const docs = readDocuments();
  const doc = docs.find(d => d.id === Number(req.params.id));
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

// 문서 HTML 변환 API
router.get('/:id/html', (req, res) => {
  const docs = readDocuments();
  const doc = docs.find(d => d.id === Number(req.params.id));
  if (!doc) return res.status(404).json({ error: 'Not found' });
  const html = marked.parse(doc.content || '');
  res.send(html);
});

// 문서 생성
router.post('/', (req, res) => {
  const docs = readDocuments();
  const { title, content } = req.body;
  const newDoc = { id: idCounter++, title, content };
  docs.push(newDoc);
  writeDocuments(docs);
  res.status(201).json(newDoc);
});

// 문서 수정
router.put('/:id', (req, res) => {
  const docs = readDocuments();
  const doc = docs.find(d => d.id === Number(req.params.id));
  if (!doc) return res.status(404).json({ error: 'Not found' });
  doc.title = req.body.title;
  doc.content = req.body.content;
  writeDocuments(docs);
  res.json(doc);
});

// 문서 삭제
router.delete('/:id', (req, res) => {
  let docs = readDocuments();
  const idx = docs.findIndex(d => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  docs.splice(idx, 1);
  writeDocuments(docs);
  res.status(204).end();
});

module.exports = router;
