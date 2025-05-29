const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
