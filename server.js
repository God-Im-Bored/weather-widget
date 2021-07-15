const http = require("http");
const httpProxy = require("http-proxy");

const PORT = process.env.PORT || 3333;
httpProxy.createProxyServer({ target: "http://127.0.0.1" }).listen(PORT);