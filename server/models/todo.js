// kreiranje Mongoose modela tj definiranje atributa za ToDo bazu
var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', { // drugi argument je object koji definira razl. propertiese za model
    text: {
        type: String,
        required: true,  // validator: mora biti tekst unos inače neće snimiti
        minlength: 1,     // min dužina text unosa
        trim: true     // ukida white space na početku i kraju unosa
    },
    completed: {
        type: Boolean,
        default: false  // validation: defaultna vrijednost je false
    },
    completedAt: {
        type: Number,
        default: null  // validator
    }
});

module.exports = {Todo};