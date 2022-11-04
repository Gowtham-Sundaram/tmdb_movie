const http = require('http')
const fs = require('fs')
const port = process.env.PORT ||3000;

function sendFile(filename, contentType, res, callback) {
    fs.readFile(filename, function(error, data) {
        if (error) {
            console.log(error);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('Something does not work well');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
        }
        res.end();
        if (callback) {
            callback(error);
        }
    });
}

const server = http.createServer(function(req, res) {
    if (req.url === "/script.js") {
        sendFile('script.js', 'text/javascript',res);
    } 
    else if (req.url === "/style.css") {
        sendFile('style.css', 'text/css',res);
    }
    else if (req.url === "/") {
        sendFile('index.html', 'text/html',res);
    } else {
        res.statusCode = 404;
        res.end();
    }
})

server.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong' + error)
    } else {
        console.log('Everything is working fine on port ' + port)
    }
})