// spajanje na mongoDB bazu je odvojeno od koda
var mongoose = require('mongoose');

// spajanje na bazu
mongoose.Promise = global.Promise;  // koristimo default promises umjesto callbacks
// mongoose.connect('mongodb://localhost:27017/TodoApp');  // spajanje na MnogoDB bazu: localhost je adresa 27017 je port, TodoApp je ime baze
process.env.MONGODB_URI = 'mongodb://adriatic111:zagreb2108@ds115625.mlab.com:15625/todoapp';

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://localhost:27017/TodoApp');





module.exports = {  // exportiranje podataka
    mongoose: mongoose   // može i samo = {mongoose}; jer je identično ime
};