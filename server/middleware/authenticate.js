var {User} = require('./../models/user');  //  ./ je local directory, ../ je up one level back

// naša middleware funkcija za korištenje token pristupa, za private pristup u server.js
// post i get route ovo mogu koristiti kao middleware jer je funkcija reusable
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    
        User.findByToken(token).then((user) => {
            if(!user) {
                return Promise.reject();
            }
            req.user = user;
            req.token = token;
            next();  // bez ovoga kod u route app.get('/users/me') koji poziva ovu funkciju ne bi se izvršio
        }).catch((e) => {
            res.status(401).send();  // 401 znači autentifikacija nije prošla, šalje empty body() - unauthorized
        }); // ovdje nećemo zvati next() za izvršenje koda app.get ako kod nije radio kako treba
};

module.exports = {authenticate};  // ES&, jednako kao objekt {authenticate: authenticate}