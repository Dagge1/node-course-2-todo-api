// testiranje
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');  // relative path, zatim jedan dir natrag i onda fajl
const {Todo} = require('./../models/todo');

const todos = [{  // prije testa u lekciji 76 moramo dodati par unosa jer je prijašnji test ispraznio bazu
    text: 'First test todo'     // array sa dva objekta tj dva unosa u bazu
}, {
    text: 'Second test todo'
}];


beforeEach((done) => {   // prije svakog testa provjeri dali je baza prazna prije svakog testa,
    Todo.remove({}).then(() => {  // isprazni bazu, zatim..
        Todo.insertMany(todos);   // mongoose method koji ubacuje više recorda/dokumenta odjednom (iz arraya todos)
    }).then(() => done());    
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {  //  ()done) treba jer je asinhroni test
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));  // statement arrow function syntax    
        });
    });
});
// tu fali testni kod iz prijašnje test lekcije

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
           expect(res.body.todos.length).toBe(2); 
        })
        .end(done);
    });
});