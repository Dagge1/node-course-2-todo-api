// mongo-data je dir gdje će svi podaci baze biti storani. Treba pokrenuti mongo server + upiši cijeli path do tog db direktorija:
// Prvo treba startati Mongo server iz CLI. Nađi u Program files../MongoDB  mongod.exe i napiši:
// mongod.exe --dbpath c:/wamp/www/programi/2017/node_mead/mongo-data
// ako želimo connectati na bazu iz CLI tada iz /bin upišemo mongo.exe (inače koristimo Robomongo, kao Wampserver za PHP/MySQL)

// const MongoClient = require('mongodb').MongoClient; // Mongo client za db manipulaciju iz Node-a
const {MongoClient, ObjectID} = require('mongodb'); // Mongo client destructuring verzija (ES6 za vađenje propertyja ObjectID iz objecta)

/*
var obj = new ObjectID();  // na ovaj način možemo generirati unique ObjectID gdje god želimo
console.log(obj);
*/

// Mongo client za connect to the dbase. Prvi arg je URL sa lokacijom baze, drugi je callback
// callback će se trigati tek ako je connection prošao ili failao. 
// TodoApp je ime naše baze, ne moramo je kreirati prije, iako smo se ovdje spojili na nju
// MongoDB neće kreirati bazu sve dok ne počnemo dodavati podatke u nju
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {  // db je object za write/read data
MongoClient.connect('mongodb://adriatic111:zagreb2108@ds115625.mlab.com:15625/todoapp', (err, db) => {  // db je object za write/read data
    if (err) {
        return console.log('Unable to connect to MongoDB server'); // return će prekinuti izvršenje ispod ako je error
    }
    console.log('Connected to MongoDB server');  // ako nema errora
    
    // kreiramo novu collection 'Todos' (kao table u MySQL) i insertamo novi unos sa methodom insertOne()
    // prvi argument je object koji sprema razne name-value parove, drugi je callback koji triga ako prođe ok ili sa errorom
    
    db.collection('Todos').insertOne({   // insertOne je method za insertanje jednog unosa ručno sa triganjem fajla a ne sa HTTP POST requestom
        text: 'Something to do',
        completed: false
    }, (err, result) => {  // callback unesi kod ako je error ili printaj ako je uspješno unesen
    if (err) {  // ovaj callback nije obavezan
        return console.log('Unable to insert todo', err);
    }
    // u slučaju uspjeha isprintaj formatirano rezultat unosa
    console.log(JSON.stringify(result.ops, undefined, 2));  // ops prikazuje sve docs koji su insertani 
    });
    

    /* *******
    db.collection('Users').insertOne({  // novi unos (record) u novi collection (table) 'Users'
        name: 'Davor',
        age: 50,
        location: 'London'
    }, (err, result) => {  // ovaj dio nije obavezan
        if (err) {
            return console.log('Unable to insert user ', err);
        }
        console.log(result.ops[0]._id.getTimestamp());  // prvi unos u arrayu, property _id u objektu (izvuci vrijeme iz id-a)
    });
    */

    db.close();
});