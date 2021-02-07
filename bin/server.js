'use strict';

const http = require('http')
const app = require('../src/app');
const port = process.env.port || 3001;
const server = http.createServer(app);

server.listen(port);
console.log(`Server rodando na porta ${port}`)