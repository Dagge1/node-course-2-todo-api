// testiranje
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');  // relative path, zatim jedan dir natrag i onda fajl
const {Todo} = require('./../models/todo');

beforeEach((done) => {   // prije svakog testa provjeri dali je baza prazna prije svakog testa,
    Todo.remove({}).then(() => {    // ako nije onda isprazni
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {  //  ()done) treba jer je asinhroni test
        var text = 'Test todo text';

        request(app)
        .post('./todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            
            Todo.find().then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));  // statement arrow function syntax    
        });
    });
});