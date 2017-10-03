// spajanje na mongo je odvojeno od koda
var mongoose = require('mongoose');

// spajanje na bazu
mongoose.Promise = global.Promise;  // koristimo default promises umjesto callbacks
mongoose.connect('mongodb://localhost:27017/TodoApp');  // spajanje na MnogoDB bazu:

module.exports = {  // exportiranje podataka
    mongoose: mongoose   // može i samo = {mongoose}; jer je identično ime
};