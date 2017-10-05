var mongoose = require('mongoose'); 
// mongoose model tj definiranje parametara polja za pojedini record u databazu (kao sa MySQL, tip: string, duljina itd)

var User = mongoose.model('User', {   // definiranje polja za tabelu 'User' (tj collection u MongoDB)
    email: {      // ime polja (tj column u MySQL)
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }    
});

module.exports = {User};