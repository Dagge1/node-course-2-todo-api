const mongoose = require('mongoose');
const validator = require('validator');  // za provjeru emaila, telefona, kartice itd 
// mongoose model tj definiranje parametara polja za pojedini record u databazu (kao sa MySQL, tip: string, duljina itd)

// osim originalnog naziva u collection 'users', mongoose autom. gleda množinu za ovdje navedeni naziv 'User',
// prema tome spaja sa 'users' collection u bazi. Nebitno da li je veliko slovo
// var 'User' može biti bilo koje ime, ne mora biti isto kao desno
var User = mongoose.model('User', {   // definiranje polja za tabelu 'User' (tj collection u MongoDB)
    email: {      // ime polja (tj column u MySQL)
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,  // ne može se registrirati sa dva ista emaila, default je false
        validate: {  // mongoose docs validation, za provjeru email formata (install npm validator)
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'  // injectali smo email sa VALUE
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6 
    },
    tokens: [{  // sigurnosni tokeni za mongoDB, za SQL nema
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true            
        }
    }]    
});

module.exports = {User};