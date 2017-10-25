// enkripcija requesta, login itd. Sa SHA 256
// hashing je one-way encryption. Od originalne poruke 
// mogu uvijek dobiti hash ali od hash-a ne mogu natrag dobiti original
// ista original poruka uvijek daje isti hash niz karaktera
// Princip: user unese password, sistem ga hashira i provjeri da li je isti 
// sa hashom koji imamo u bazi. AKo želimo da hash bude svaki put drugi dodajemo salt
// salt je niz karaktera koji svaki put daje drukčiji hash.
// sistem ovdje opisan je JSON web token (JWT) i koristi se u kriptiranju pasworda i pristupa
const {SHA256} = require('crypto-js'); // ovo je za probu kriptiranja ali koristiti ćemo jwt jer je lakše
const jwt = require('jsonwebtoken'); // library za generiranje i provjeru passworda

// *** jsonwebtoken - vidi i jwt.io za provjeru tokena
// metoda za login i druga za provjeru pasworda, te za autentifikaciju requesta (za brisanjem todo itema npr)

var data = {
    id: 10
};
// sign uzima object i moj secret salt. Taj token vraća useru kada se logira ..
// plus value sprema u token array u user.js
var token = jwt.sign(data, '123abc'); // daje preko 100 char token
console.log(token);

// za dekodiranje i provjeru
var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded); // vraća originalni object sa podacima



/* *** crypto-js ***
var message = 'I am user number 3';
var hash = SHA256(message).toString(); // pretvara object u string

console.log('Message: ' + message);
console.log('Hash: ' + hash);
console.log('Broj hash karaktera: ' + hash.length + '\n');

var data = {
    id: 4
};
// token uzima id usera i pretvara ga u hash. Tako da provjerimo da li je korisnik
// onaj pravi koji želi naoraviti izmjenu na id unosu
var token = {
    data: data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString() // 'somesecret' je salt
}

// ako probamo promijeniti id i hashiramo tako promijenjeno, neće raditi jer nema salt
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
// end of promjena id-a

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('Data was not changed');
} else {
    console.log('Data was changed. Do not trust!');
}
*** end of crypto-js */



