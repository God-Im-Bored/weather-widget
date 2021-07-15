const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();

app.use(cors())

app.use(function (req, res, next) {
    res.setHeader("content-security-policy-report-only", "default-src 'self'; font-src 'self' data: https://maxcdn.bootstrapcdn.com; img-src 'self' http://c0nrad.io; object-src 'none'; script-src 'report-sample' 'self'; style-src 'report-sample' 'self' https://maxcdn.bootstrapcdn.com; base-uri 'none'; report-uri http://ip-api.com/json/;");
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