const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req,res)=>{

    const parsedUrl = url.parse(req.url, true);
    const name = parsedUrl.query.name;

    res.setHeader('Content-Type', 'text/plain');

    if(parsedUrl.pathname === "/submit" &&  name){
        console.log(`Received name: ${name}`);

        fs.appendFile('./docs/reveivedNames.txt',`client name: ${name}\n`, (err)=>{
            if(err){
                res.end('Faild to save name');
                return
            }else{
            console.log('names appended');
            res.end("Name received");
            }
        })
        
    }else if(parsedUrl.pathname === "/list"){
        fs.readFile('../docs/reveivedNames.txt',(err, data)=>{
            if(err){
                res.end('Could not read file');
                return
            }else{
                res.end(data.toString())
            }
        })

    }else{
        console.log('Invalid Route');
        res.end("Invalid Route")
    }

})

server.listen('3000', 'localhost', ()=>{
    console.log('Listening for Requensts on Port 3000');
})