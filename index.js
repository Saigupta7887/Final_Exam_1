const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    
       res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST')


   
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'),
            (err, content) => {

                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        );
    }

    else if (req.url==='/api')
    {

       var input;

       const { MongoClient } = require('mongodb');

       main(processData);
       async function main(callback) {

           const uri = "mongodb+srv://sais:Neural@saicluster.xivdgvr.mongodb.net/?retryWrites=true&w=majority ";
           const client = new MongoClient(uri, { useUnifiedTopology: true });

           try {
              
               await client.connect();
               const saiCollection = client.db('bookdb').collection('bookcollection');
               const collectionData = {

                   books: await saiCollection.find().toArray()
               };
               
               console.log(collectionData);


               input = collectionData;
              
               console.log(input);
               callback(input);

           } catch (err) {
               console.error(err);
           } finally {
               await client.close();
           }
       }
       function processData(data) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(JSON.stringify(data));
    }

    }
    else{
        res.end("<h1> 404 nothing is here</h1>");
    }

    
});

const PORT= process.env.PORT || 4552;

server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));
