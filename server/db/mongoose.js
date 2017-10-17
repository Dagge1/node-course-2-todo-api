// spajanje na mongoDB bazu je odvojeno od koda
var mongoose = require('mongoose');

// spajanje na bazu
mongoose.Promise = global.Promise;  // koristimo default promises umjesto callbacks

// mongoose.connect('mongodb://localhost:27017/TodoApp');  // spajanje na MnogoDB bazu: localhost je adresa 27017 je port, TodoApp je ime baze
// process.env.MONGODB_URI = 'mongodb://heroku_lqn963cb:20c14q48hecsj3euvhuuhj36go@ds117605.mlab.com:17605/heroku_lqn963cb';


let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  // mlab: 'mongodb://heroku_lqn963cb:zagreb2108@ds117605.mlab.com:17605/heroku_lqn963cb'
  mlab: 'mongodb://adriat:zagreb2108@ds117605.mlab.com:17605/heroku_lqn963cb'  // I have two db users at mLab
};
mongoose.connect( db.mlab || db.localhost);




// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
// mongoose.connect('mongodb://localhost:27017/TodoApp');
// mongoose.connect('mongodb://adriatic111:zagreb2108@ds117605.mlab.com:17605/adriat'); //from heroku

//mongoose.connect('mongodb://heroku_lqn963cb:20c14q48hecsj3euvhuuhj36go@ds117605.mlab.com:17605/heroku_lqn963cb');





module.exports = {  // exportiranje podataka
    mongoose: mongoose   // može i samo = {mongoose}; jer je identično ime
};