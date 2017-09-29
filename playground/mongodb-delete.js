// deletanje recorda iz baze

// const MongoClient = require('mongodb').MongoClient; // Mongo client za db manipulaciju iz Node-a
const {MongoClient, ObjectID} = require('mongodb'); // Mongo client destructuring verzija (ES6 za vađenje propertyja ObjectID iz objecta)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {  // db je object za write/read data
    if (err) {
        return console.log('Unable to connect to MongoDB server'); // return će prekinuti izvršenje ispod ako je error
    }
    console.log('Connected to MongoDB server');  // ako nema errora
    
    // tri metode deletanja: deleteMany, deleteOne, findOneAndDelete (nađi i deletaj i prikaži na ekranu objwct sa deletanim)
    
    // deleteMany
    /*
    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });
    */
    
    // deleteOne - radi kao i deleteMany ali deleta samo prvi record od onih koji ispune kriterije
    /*
    db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });
    */

    // findOneAndDelete - deleta jedan. Najkorisniji, možeš deletati prema ID-u,
    // možeš undo-ati deletano itd. Pokazuje dokument koji je deletao
    /*
    
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });
    */

    // moja vježba, deleteMany
    /*
    db.collection('Users').deleteMany({name: 'Davor'}); // bez then() error checking i informacija na ekranu
    */

    // vježba - findOneAndDelete sa ID kriterijem (treba koristiti constructor ObjectID() )
    db.collection('Users').findOneAndDelete({_id: new ObjectID('59ce2dd3b94b62ec03325376')}).then((results) => {
        console.log(JSON.stringify(results, null, 2));
    });
    
    // db.close();
});