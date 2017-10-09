// db queries za brisanje
const {ObjectID} = require('mongodb');  // ovo nije obavezno, za lakše korištenje ID-a

const {mongoose} = require('./../server/db/mongoose'); // ./ = koristimo local file ../ = idemo up directory
const {Todo} = require('./../server/models/todo'); // todo je kao todo.js
const {User} = require('./../server/models/user');  // za tabelu User

// obriši sve unose u tabeli
/*
Todo.remove({}).then((result) => {  
    console.log(result);
});
*/

// Obriši prvi koji nađeš - Todo.findOneAndRemove() - u callbacku vraća dokument koji je obrisao
Todo.findOneAndRemove({_id: '59db721ad2d9e8848869766d'}).then((todo) => {
    console.log(todo);
});


// obriši by ID (returna obrisani dokument)
/*
Todo.findByIdAndRemove('59db7139d2d9e8848869764d').then((todo) => {
    console.log(todo);
});
*/