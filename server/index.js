const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.get('/', (req, res) => res.send('Express 서버 기본 설정 완료!'));
app.listen(PORT, () => console.log());
