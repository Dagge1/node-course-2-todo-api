// library imports - todo.js je model za podatke recorda (tip, duljina itd), mongoose.js je konekcija na bazu 'TodoApp'
var express = require('express');
var bodyParser = require('body-parser');  // za parsanje stringa u objekt

// my local imports into this document
var {mongoose} = require('./db/mongoose');  // ES6 način sa {}, destructuring
// var mongoose = require('./db/mongoose').mongoose;    // stari način
var {Todo} = require('./models/todo');  // moglo bi i ./models/todo.js
var {User} = require('./models/user');  // ovo je drugi collection (db tabela) i u ovom fajlu se ne koristi

// *** postavljanje basic servera ****
var app = express();
app.use(bodyParser.json());

// *** POST request

// app.post je URL handler  a '/todos' je URL. Da stavimo /todos/3244 to bi bio indivivualni post
app.post('/todos', (req, res) => { // todos je naziv lokacije u browseru, može biti i /dobardan
    var todo = new Todo ({  // novi tekst korištenjem modela/šprance Todo iz todo.js 
        text: req.body.text  // odakle se šalje i kamo (u text:)
    });

    todo.save().then((doc) => {    // i save, nakon toga ide promise (nije uvjet)
        res.send(doc);            // prikaži sejvano  (nije uvjet od then() nadalje)
    }, (e) => {
        res.status(400).send(e); // status 400 je Bad request (user nije unio dobro unio podatak)
    });
});

// ***** GET request ***
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {  // prikaži sve todo unose. Da je query find(nešto) prikazao bi filtrirano
        res.send({todos});    // ako je ok šalje podatke natrag. todos je samo placeholder ime
    }, (e) => {           // promise u slučaju da bude rejected
        res.status(400).send(e); 
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};



































/*
var user = new User({
    email: 'miro@gmail.com'
});

user.save();
*/


// vježbe - unos novog todo-a
/*
var newTodo = new Todo({
    text: 'Cook dinner'
});
// sejvanje (ne treba promise then ali može)
newTodo.save().then((doc) => {
    console.log('Saved todo', doc);  // prikaži sejvani dokument tj record
}, (e) => {   // u slučaju errora
    console.log('Unable to save todo');
});
*/

// novi unos i sejvanje
/*
var otherTodo = new Todo({
    text: 'Feed the dog'
    // completed: false,
    // completedAt: 30092017   // time počinje 01 01 1970, tada je 0
});

otherTodo.save().then((doc) => {
    console.log('Another saved todo', doc);
}, (e) => {
    console.log('Cannot save todo', e);
});
*/