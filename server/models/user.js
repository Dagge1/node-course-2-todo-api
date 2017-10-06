var mongoose = require('mongoose'); 
// mongoose model tj definiranje parametara polja za pojedini record u databazu (kao sa MySQL, tip: string, duljina itd)

// osim originalnog naziva u collection 'users', mongoose autom. gleda množinu za ovdje navedeni naziv 'User',
// prema tome spaja sa 'users' collection u bazi. Nebitno da li je veliko slovo
// var 'User' može biti bilo koje ime, ne mora biti isto kao desno
var User = mongoose.model('User', {   // definiranje polja za tabelu 'User' (tj collection u MongoDB)
    email: {      // ime polja (tj column u MySQL)
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }    
});

module.exports = {User};