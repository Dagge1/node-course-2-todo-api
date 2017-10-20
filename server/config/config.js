// fajl koji određuje koju bazu ćemo koristiti ovisno da li je prod, dev ili testing
// ubačen je a početku server.js
var env = process.env.NODE_ENV || 'development';  // za switchanje porta ovisno o tipu rada

if (env === 'development') {  // ovisno o radu (produkcija, dev, testiranje) odrediti ćemo port
    process.env.PORT = 3000;  // ako je 'dev': port za local server
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';  // URI za lokalnu db
} else { // za testiranje koristiti ćemo drugu local bazu
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';  // URI za novu, testnu bazu
}