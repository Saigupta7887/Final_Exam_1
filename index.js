const http = require("http");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const server = http.createServer((req, res) => {

    /*



        we can Navigate to different pages via different requests.
        if / then goto index.html
        if /about about then goto about.html
        if /api then laod the JSON file  /  ;) this might be something you need for your exam.



    */


    var corsOptions = {
        origin: "*",
    };
    // server.use(cors());
    if (req.url === '/') {
        // read public.html file from public folder
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
            (err, content) => {

                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }

    else if (req.url === '/about') {


        // read the about.html file public folder
        fs.readFile(
            path.join(__dirname, 'public', 'about.html'),
            (err, content) => {

                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }
    else if (req.url==='/api')
    {
        fs.readFile(
            path.join(__dirname, 'public', 'db.json'),'utf-8',
            (err, content) => {

                if (err) throw err;
                // Please note the content-type here is application/json
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(content);
            }
        );
    }
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }

    /*

        But what if we have  1000 pages/urls ? do we need to write 1000 if-else statements?

    /*/
});

const PORT= process.env.PORT || 5959;

server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));