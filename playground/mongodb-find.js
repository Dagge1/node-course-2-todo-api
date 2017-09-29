// čitanje recorda iz baze

// const MongoClient = require('mongodb').MongoClient; // Mongo client za db manipulaciju iz Node-a
const {MongoClient, ObjectID} = require('mongodb'); // Mongo client destructuring verzija (ES6 za vađenje propertyja ObjectID iz objecta)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {  // db je object za write/read data
    if (err) {
        return console.log('Unable to connect to MongoDB server'); // return će prekinuti izvršenje ispod ako je error
    }
    console.log('Connected to MongoDB server');  // ako nema errora
    /*
    db.collection('Todos').find({
        _id: new ObjectID("59cd3dd97301ec193144e4a9")
    }).toArray().then((docs) => {  // prvo nađi, pretvori u array i prikaži (promise)
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));  // prikaži pronađene dokumente (u SQL ekvivalent records) 

    }, (err) => {  // u slučaju greške ide callback
        console.log('Unable to fetch todos', err);
    });    
    */
    /*
    db.collection('Todos').find().count().then((count) => {  // prvo nađi, pretvori u array i prikaži (promise)
        console.log('Todos count: ' + count);
    }, (err) => {  // u slučaju greške ide callback
        console.log('Unable to fetch todos', err);
    });
    */

    db.collection('Users').find({name: "Davor"}).toArray().then((doc) => {
        console.log(JSON.stringify(doc, null, 2));
    });

    // db.close();
});