const mongoose = require('mongoose');
const validator = require('validator');  // za provjeru emaila, telefona, kartice itd 
const jwt = require('jsonwebtoken');  // za šifriranje i token
const _ = require('lodash');   // za korištenje_.pick() metode
// mongoose model tj definiranje parametara polja za pojedini record u databazu (kao sa MySQL, tip: string, duljina itd)

// osim originalnog naziva u collection 'users', mongoose autom. gleda množinu za ovdje navedeni naziv 'User',
// prema tome spaja sa 'users' collection u bazi. Nebitno da li je veliko slovo
// var 'User' može biti bilo koje ime, ne mora biti isto kao desno


// kada želimo napraviti svoju schemu, da bi mogli dodavati svoe methode
var UserSchema = new mongoose.Schema({   // definiranje polja za MongoDB Collection (tabela u MySQL)
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


// user schema za overridanje standard responsa (da ne pošalje useru token i password)
// ona određuje što će se useru vratiti u JSON formatu
UserSchema.methods.toJSON = function () {   // prvo uzmemo kompletan JSON odgovor
    var user = this;                // zatim sa _.pich odaberemo što ćemo od toga poslati
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);  // http req. odgovor prikaži samo id i email 
};


// UserSchema.methods je object u koji možemo staviti bilo koji method želimo
UserSchema.methods.generateAuthToken = function () { // klasična funkcija zbog 'this'
    var user = this;  // instance method se poziva sa individualnim dokumentom
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens.push({access, token});  // ES6 način, kao access: access, token: token

    return user.save().then(() => {
        return token;
    });
};

// statics je object, sve dodano pretvoriti će se u model method umjesto instance method
// FindByToken je property objekta statics
UserSchema.statics.findByToken = function (token) {
    var User = this;     // model method (sa velikim slovom) se poziva sa modelom this

    var decoded; // kreiramo undefined varijablu
    // ako kod u try ne javi grešku nastavlja dolje
    try {
        decoded = jwt.verify(token, 'abc123'); // ako dekodiramo token poslan u headeru...
    } catch(e) {  // ako javi grešku prekida dolje izvršenje
        return Promise.reject();
    }

    //ako je try prošao (token je ispravan), nađi usera
    return User.findOne({   // pronađi jedan unos
        "_id": decoded._id,
        "tokens.token": token,  // ako vrijednost ima točku . treba quotes " ili '
        "tokens.access": "auth"
    });    
};


// standardna mongoose schema koja koristi našu gore definiranu custom schemu
var User = mongoose.model('User', UserSchema);

module.exports = {User};