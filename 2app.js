const http = require('http');
const routes = require('./3routes');

//const server = http.createServer(routes);
const server = http.createServer(routes.handler);

server.listen(3000, () => {
    console.log('Server is running on 3000...');
});
