var users = require('../data/db.json');
const {v4:uuidv4} = require('uuid');
const {writeFile} = require('../utils');

function findAll(){
    return new Promise ((resolve,reject) => {
        resolve(users);
    })
}

function findById(id){
    return new Promise ((resolve,reject) => {
        const user = users.find((k)=> k.id == id);
        resolve(user);
    })
}

function create(user){
    return new Promise ((resolve,reject) => {
        const newUser ={id:uuidv4(),...user};
        users.push(newUser);
        writeFile('./data/db.json',users);
        resolve(newUser);
    })
}

function update(id, userData){
    return new Promise ((resolve,reject) => {
        const index = users.findIndex((k) => k.id === id);
        users[index] = {id,...userData}
        writeFile('./data/db.json',users);
        resolve(users[index]);
    })
}

function remove(id){
    return new Promise ((resolve,reject) => {
        users = users.filter((k) => k.id !== id);
        writeFile('./data/db.json',users);
        resolve
     })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}