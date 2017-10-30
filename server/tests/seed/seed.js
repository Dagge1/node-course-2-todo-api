const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');  // za token auth
const {Todo} = require('./../../models/todo');  // idemo up 2 direktorija
const {User} = require('./../../models/user');  

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{ // array sa 2 usera da napunimo bazu
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass',
}];

const todos = [{  // prije testa u lekciji 76 moramo dodati par unosa jer je prijašnji test ispraznio bazu
    _id: new ObjectID(),  // sami generiramo id
    text: 'First test todo'     // array sa dva objekta tj dva unosa u bazu
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];


const populateTodos = (done) => {   // prije svakog testa provjeri da li je baza prazna prije svakog testa,
    Todo.remove({}).then(() => {  // prvo isprazni bazu ..
        return Todo.insertMany(todos);  // zatim ubaci nove unose sa insertMany()
    }).then(() => done());  
};

const populateUsers = (done) => {
    User.remove({}).then(() => { // prvo obriši sve unose u db, zatim...
        var userOne = new User(users[0]).save();  // ovo je promise
        var userTwo = new User(users[1]).save();  // save() poziva middleware
        // Promise.all služi da ne snimi u db sve dok userone i usertwo nisu ok
        return Promise.all([userOne, userTwo])
    }).then(() => done());
};

// ES6 način za todos: todos, ...
module.exports = {todos, populateTodos, users, populateUsers}; 