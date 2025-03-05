const http = require('http');
//const kullanicilar = require('./data/db.json');
const {getUsers,getUser,createUser,updateUser,deleteUser} = require('./controller/userController');


const server = http.createServer((req,res) => {
    // console.log(req.url);
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Merhaba</h1>');
    // res.end();

    if(req.url === '/api/users' && req.method === 'GET'){
        // res.writeHead(200, {'Content-Type':'application/json'});
        // res.end(JSON.stringify(kullanicilar));
        getUsers(req,res);
    }else if(req.url.match(/\/api\/user\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[3];
        getUser(req,res, id);
    }else if(req.url === '/api/user' && req.method === 'POST'){
        createUser(req,res);
    }else if(req.url.match(/\/api\/user\/([0-9]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[3];
        updateUser(req,res, id);
    }else if(req.url.match(/\/api\/user\/([0-9]+)/) && req.method === 'DELETE'){
        const id = req.url.split('/')[3];
        deleteUser(req,res, id);
    }else{
        res.writeHead(404, {'Content-Type':'application/json'});
        res.end(JSON.stringify({mesaj :"Yönlendirme geçersiz"}));
       
    }
    

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log('server ${PORT} port no ile çalışıyor'))