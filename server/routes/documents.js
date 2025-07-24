const express = require('express');
const router = express.Router();

// 임시 메모리 저장소 (파일 기반 저장은 이후 이슈에서 구현)
let documents = [];
let idCounter = 1;

// 문서 목록 조회
router.get('/', (req, res) => {
  res.json(documents);
});

// 문서 단일 조회
router.get('/:id', (req, res) => {
  const doc = documents.find(d => d.id === Number(req.params.id));
  if (!doc) return res.status(404).json({ error: 'Not found' });
  res.json(doc);
});

// 문서 생성
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newDoc = { id: idCounter++, title, content };
  documents.push(newDoc);
  res.status(201).json(newDoc);
});

// 문서 수정
router.put('/:id', (req, res) => {
  const doc = documents.find(d => d.id === Number(req.params.id));
  if (!doc) return res.status(404).json({ error: 'Not found' });
  doc.title = req.body.title;
  doc.content = req.body.content;
  res.json(doc);
});

// 문서 삭제
router.delete('/:id', (req, res) => {
  const idx = documents.findIndex(d => d.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  documents.splice(idx, 1);
  res.status(204).end();
});

module.exports = router;
