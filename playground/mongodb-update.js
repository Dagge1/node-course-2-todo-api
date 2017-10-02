// deletanje recorda iz baze

// const MongoClient = require('mongodb').MongoClient; // Mongo client za db manipulaciju iz Node-a
const {MongoClient, ObjectID} = require('mongodb'); // Mongo client destructuring verzija (ES6 za vađenje propertyja ObjectID iz objecta)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {  // db je object za write/read data
    if (err) {
        return console.log('Unable to connect to MongoDB server'); // return će prekinuti izvršenje ispod ako je error
    }
    console.log('Connected to MongoDB server');  // ako nema errora
    
    // findOneAndUpdate() - updatanje recorda i prikaz istog na ekranu
    
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('59ce252db94b62ec0332509f')  // odabir unosa za update (pomoću ID-a)
    }, {   // 2. parametar je updejtanje unosa
        $set: {  // $set je update operator
            completed: true
        }
    }, {
        returnOriginal: false   // optional, returna updated doc (true je returna original)
    }).then((result) => {       // promise
        console.log(result);
    });

    // drugo updatanje, polja 'name' i povećanje 'age' za 1 sa $inc operatorom
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('59cd0d9fde56b915c8043c8a')
    }, {
        $set: {
            name: 'Marijan'
        },
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result);
    });
    // db.close();
});