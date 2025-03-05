const User = require('../models/userModel');
const {getPostData} = require('../utils');

async function getUsers(req,res) {
    try{
        const users = await User.findAll();
        res.writeHead(200, {'Content-Type':'application/json'});
        res.end(JSON.stringify(users));
    }catch (error){
        console.log(error);
    }
}


async function getUser(req,res, id) {
    try{
        const user = await User.findById(id);
        if(!user){
            res.writeHead(404, {'Content-Type':'application/json'});
            res.end(JSON.stringify({mesaj: 'Kullanıcı bulunamadı'}));
        }else{
            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify(user));
        }
      
    }catch (error){
        console.log(error);
    }
}

async function createUser(req,res) {
    try{
        // const user = {
        //     names : "test",
        //     email: "test@gmail.com"
        // }

        const body = await getPostData(req);
        const {name,email} = JSON.parse(body);

        const user = {
            name,
            email
        };

        const newUser = await User.create(user);
        res.writeHead(201, {'Content-Type':'application/json'});
        return res.end(JSON.stringify(newUser));

    }catch (error){
        console.log(error);
    }
}


async function updateUser(req,res, id) {
    try{
        const user = await User.findById(id);
        if(!user){
            res.writeHead(404, {'Content-Type':'application/json'});
            res.end(JSON.stringify({mesaj: 'Kullanıcı bulunamadı'}));
        }else{

            const body = await getPostData(req);
            const {name,email} = JSON.parse(body);
    
            const userData = {
                name:name || user.name,
                email: email || user.email
            };

            const updateUser = await User.update(id,userData);

            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify(updateUser));
        }
      
    }catch (error){
        console.log(error);
    }
}

async function deleteUser(req,res, id) {
    try{
        const user = await User.findById(id);
        if(!user){
            res.writeHead(404, {'Content-Type':'application/json'});
            res.end(JSON.stringify({mesaj: 'Kullanıcı bulunamadı'}));
        }else{

            await User.remove(id);

            res.writeHead(200, {'Content-Type':'application/json'});
            res.end(JSON.stringify({mesaj:  'Kullanıcı silindi'}));
        }
      
    }catch (error){
        console.log(error);
    }
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}