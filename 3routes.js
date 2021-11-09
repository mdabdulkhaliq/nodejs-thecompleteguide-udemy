const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write('<html>');
        res.write('<head>');
        res.write('<title>My Node application</title>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><input type="submit" value="submit"></button></form></body>');
        res.write('</head>');
        res.write('</html>');
        return res.end(); 
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split("=")[1];
            fs.writeFile('message.txt',message, (error) => {
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });            
        });
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My application header</title></head>');
    res.write('<body><h2>Hello...</h2></body>')
    res.write('</html>');
    res.end();
};

//module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     text: "sometext"
// }

// module.exports.handler = requestHandler;

exports.handler = requestHandler;