// spajanje na mongoDB bazu je odvojeno od koda
var mongoose = require('mongoose');

// spajanje na bazu
mongoose.Promise = global.Promise;  // koristimo default promises umjesto callbacks

//mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(process.env.NODE_ENV);

module.exports = {  // exportiranje podataka
    mongoose: mongoose   // može i samo = {mongoose}; jer je identično ime
};