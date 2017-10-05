// db queries
const {ObjectID} = require('mongodb');  // ovo nije obavezno, za lakše korištenje ID-a

const {mongoose} = require('./../server/db/mongoose'); // ./ = koristimo local file ../ = idemo up directory
const {Todo} = require('./../server/models/todo'); // todo je kao todo.js
const {User} = require('./../server/models/user');  // za tabelu User

var userId = "59d243636d56106015fff0af";  // ID iz tabele User
/*
var id = "59d66731d9328e5c16831cbb";  // ID jednog unosa u bazi, mora biti sa ""

if (!ObjectID.isValid(id) ) {  // ObjectId je method mongodb objekta koji provjerava da li je ID validan
    console.log('ID not valid');  // ovaj kod nije obavezan
}    

Todo.find({   // da nema objekta kao query filtera find() bi izlistao sve unose
    _id: id   // ne moramo convertati id u Object ID, mongoose to napravi sam
}).then((todos) => {
    console.log('Todos', todos);   // isprinta todos array sa objektima (unosima)  
});
// *******************

Todo.findOne({  // naći će samo prvi ako ima više rezultata. Bolje jer ako ne nađe daje null a ne empty array   
    _id: id   // preporučeno ako tražiš samo jedan unos koji nije ID
}).then((todo) => {  // todo je samo placeholder za argument, može bilo koje ime
    console.log('Todo', todo);  // isprinta jedan object    
});

Todo.findById(id).then((todo) => {  // dobro za tražiti samo prema ID-u
    if (!todo) {  // ako nije našao id (returna null jer daje object)
        return console.log('ID not found');  // return prekida izvršenje pa se tekst ispod neće prikazati
    }
    console.log('Todo by ID', todo);  
}).catch((e) => console.log(e));  // za slučajda je ID pogrešnog formata (a ne da ne postoji)
*/

// moja vježba, nađi unos prma ID-u iz tabele/collection 'users'
User.findById(userId).then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log('User by ID', user);
}, (e) => {
    console.log(e);
}); 