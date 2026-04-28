import http from 'node:http';
http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Mensaje desde el servidor sin cambios");
}).listen(8080, "127.0.0.1");

console.log("Server running on http://127.0.0.1:8080");