// library imports
var express = require('express');
var bodyParser = require('body-parser');  // za parsanje stringa u objekt

// my local imports
var {mongoose} = require('./db/mongoose');  // ES6 način sa {}, destructuring
// var mongoose = require('./db/mongoose').mongoose;    // stari način
var {Todo} = require('./models/todo');  // moglo bi i ./models/todo.js
var {User} = require('./models/user');

// *** postavljanje basic servera ****
var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo ({  // novi tekst..
        text: req.body.text
    });
    todo.save().then((doc) => {    // i save
        res.send(doc);            // prikaži sejvano  (nije uvjet od then() nadalje)
    }, (e) => {
        res.status(400).send(e); // status 400 je Bad request (user nije unio dobro unio podatak)
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exporta = {app};



































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