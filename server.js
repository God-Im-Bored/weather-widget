const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

app.use(cors())

app.use(function (req, res, next) {
  res.set("Content-Security-Policy", "default-src 'self'");
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

const server = app.listen(process.env.PORT || 5500, () => {
  const { port } = server.address();
  console.log(`Server running at http://localhost:${port}`);
});