const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()

const bugServiceProxy = httpProxy('http://localhost:3000/bugs')


// Proxy request
app.get('/bugs', (req, res, next) => {
  bugServiceProxy(req, res, next)
});

app.listen(9090);
console.log('gateway listening on port 9090');