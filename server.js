const express = require('express');
const helmet = require("helmet")
const path = require('path');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(helmet());

app.enable('trust proxy')

app.use(function(request, response, next) {

    if (process.env.NODE_ENV != 'development' && !request.secure) {
       return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (!/https/.test(req.protocol)) {
      return res.redirect("https://" + req.headers.host + req.url);
    } else {
      return next();
    }
  });
  
  app.use(serveStatic(__dirname + '/client', {
    maxAge: 86400,
    index: ['index.html'],
    setHeaders: function setHeader(res, path) {
      if (mime.lookup(path) === 'text/html') {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Cache-Control', 'public, max-age=0');
      }
    }
  }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    console.log(req.body)
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/ip-api.com/json', (req, res) => {
    console.log(req.body)
})

const server = app.listen(process.env.PORT || 5500, () => {
  const { port } = server.address();
  console.log(`Server running at http://localhost:${port}`);
});