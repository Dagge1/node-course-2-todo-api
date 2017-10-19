// library imports - todo.js je model za podatke recorda (tip, duljina itd), mongoose.js je konekcija na bazu 'TodoApp'
// cloud server je Heroku powerful-sea-16485 na https://powerful-sea-16485.herokuapp.com/
// kada učitaš dodaj na kraju route ili collection
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');  // za parsanje poslanog stringa u objekt koji će prikazati
const {ObjectID} = require('mongodb');  // ovo nije obavezno, za lakše korištenje ID-a

// my local imports into this document
var {mongoose} = require('./db/mongoose');  // ES6 način sa {}, destructuring
var mongoose = require('./db/mongoose').mongoose;    // stari način
var {Todo} = require('./models/todo');  // moglo bi i ./models/todo.js
var {User} = require('./models/user');  // ovo je drugi collection (db tabela) i u ovom fajlu se ne koristi

// *** postavljanje basic servera ****
var app = express();

// const port = process.env.PORT;  // port za Heroku, ako nema onda je default 3000 na localhost
// process.env je object koji pohranjuje sve environment varijable na PC-u kao key-value par,
// (u CLI utipkaj 'set'). Mi tražimo varijablu PORT koju je postavio Heroku.
const port = process.env.PORT;
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

app.get('/', (req, res) => { 
    Todo.find().then((todos) => {  // pronađi sve todo unose. Da je query find(nešto) prikazao bi filtrirano
        res.send({todos});    // ako ok šalji podatke natrag. todos je samo placeholder ime
    }, (e) => {           // promise u slučaju da bude rejected
        res.status(400).send(e); 
    });
});


// fetching individual variable from URL pomoću id-a
// :Id je URL parametar, varijabla koja će biti posalana sa request objectom i sadržavati će id recorda
app.get('/todos/:id', (req, res) => {  // upiši u Postman 'GET localhost:3000/todos/123' i dobit ćeš object sa 123 param.
  //  res.send(req.params);  // za testiranje sa Postmanom gdje upiši localhost:3000/todos/123
    var id = req.params.id;  // prikazati će samo parametar id a ne cijeli object kao sa 'req.params'

    if (!ObjectID.isValid(id) ) {  // ObjectId je method mongodb objekta koji provjerava da li je ID validan
        return res.status(404).send();  // ako id nije validan returnaj 404 error status
    }
    Todo.findById(id).then((todo) => {  // todo je naše proizvoljno placeholder ime
        if (!todo) {                        // ako nije našao..
            return res.status(404).send();  // error: not found.  send šalje nama podatak, grešku itd
        }
        res.send({todo});  // pošalji rezultat. ES6, jednako kao da je send({todo: "todo"});
    }).catch((e) => {            // ako je drugačija greška..
        res.status(400).send();  // bad request, server ne može izvršiti zahtjev
    });
});



// deletanje unosa pomoću id-a (možeš testirati sa Postman)
app.delete('/todos/:id', (req, res) => {
    // get the id
    var id = req.params.id;  // params je gdje su svi URL parametri pohranjeni

    // validate id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // remove the todo by id
    Todo.findByIdAndRemove(id).then((todo) => { 
        // if not doc, send 404
        if (!todo) {
            return res.status(404).send();
        }
        // if ok, send send doc back and status 200
        res.status(200).send({todo});

    // error case -> send 400 with empty body
    }).catch((e) => {    
        res.status(400).send();
    });
});


app.patch('/todos/:id', (req, res) => {   // za updatanje
    var id = req.params.id;  // preuzmi id sa request . params(parametri url-a) i id
    var body = _.pick(req.body, ['text', 'completed']);  // uzmi text i completed parametre iz objekta i spremi u body

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    } 

    if (_.isBoolean(body.completed) && body.completed) {  // ako je 'completed' boolean i ako je true..
    body.completedAt = new Date().getTime();  // ako je true, u polje 'CompletedAt' upiši datum
    } else {
        body.completed = false;   // polje 'completed' je false
        body.completedAt = null;  // polje 'datum kompletiranja' je null
    }
    // query za updatanje baze
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })

});

app.listen(port, () => {
    console.log('Started up at port ' + port);
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