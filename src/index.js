const http = require("http");
const fs = require("fs");
const path = require("path");
const getUsers = () => {
  const filePath = path.join(__dirname, "./data/users.json");
  return fs.readFileSync(filePath);
};
const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const params = url.searchParams;
    const name = params.get('hello');
    
    if (params.has('hello')) {
        if (name === '') {
            res.statusCode = 400;
            res.statusMessage = "Error";
            res.setHeader = "Content-Type", "text/plain";
            res.write('Enter a name')
            res.end()
            return
        }
            res.statusCode = 200;
            res.statusMessage = "OK";
            res.setHeader = "Content-Type", "text/plain";
            res.write(`Hello,${name}`);
            res.end();
            return;
          }

    if (req.url === '/users') {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.setHeader("Content-Type", "application/json");
        res.write(getUsers());
        res.end();
        return
    }
    if (req.url === '/') {

        res.statusCode = 200;
        res.statusMessage = "OK";
        res.setHeader = "Content-Type", "text/plain";
        res.write('Hello world');
        res.end();
        return;
    }
    res.statusCode = 500;
    res.statusMessage = "Internal Server Error";
    res.setHeader = "Content-Type", "text/plain";
    res.write('')
    res.end()
});
server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
