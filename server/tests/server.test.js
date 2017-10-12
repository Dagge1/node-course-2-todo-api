// testiranje
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');  // za fetchati ID

const {app} = require('./../server');  // relative path, zatim jedan dir natrag i onda fajl
const {Todo} = require('./../models/todo');

const todos = [{  // prije testa u lekciji 76 moramo dodati par unosa jer je prijašnji test ispraznio bazu
    _id: new ObjectID(),  // sami generiramo id
    text: 'First test todo'     // array sa dva objekta tj dva unosa u bazu
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];


beforeEach((done) => {   // prije svakog testa provjeri da li je baza prazna prije svakog testa,
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());  
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {  //  ()done) treba jer je asinhroni test
        var text = 'First test todo';
        // var text = 'Test todo text';

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
            
            Todo.find().then((todos) => {
                expect(todos.length).toBe(3);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));  // statement arrow function syntax    
        });
    });

    it('should not create todo with body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /todos/:id', () => {  // testing za unos prema ID-u
    it('should return todo doc', (done) => {   // 'done' argument jer je async. test
        request(app)
        .get('/todos/' + todos[0]._id.toHexString())  // id je object id, treba ga pretvoriti u string radi URL prikaza
        .expect(200)  // Http status kod, 200 znači sve je ok
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();  // kreiraj novi Id i pretvori ga u MongoDB hex id za prikaz u URL
        console.log(hexId); // prikaži kreirani MongoDB Object ID

        request(app)
        .get('/todos/' + hexId)  // id je object id, treba ga pretvoriti u string radi URL prikaza
        .expect(404)
        .end(done);

    });


    it('should return 404 for non-object ids', (done) => {
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
    });    
});


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app) // prvo requestar server.js aplikaciju
        .delete('/todos/' + hexId)  //zatim deletaj
        .expect(200)  // očekuj uspjeh (200)
        .expect((res) => {      // očekuj da će data doći natrag kao response body
            expect(res.body.todo._id).toBe(hexId);           
        })
        .end((err, res) => {  // query db da se uvjerimo da je deletano
            if (err) {
                return done(err);  // error je rendered by mocha
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo).toNotExist();
                done();
            }).catch((e) => done());
        })    
    });

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();  // kreiraj novi Id i pretvori ga u MongoDB hex id za prikaz u URL
        console.log(hexId); // prikaži kreirani MongoDB Object ID

        request(app)
        .delete('/todos/' + hexId)  // id je object id, treba ga pretvoriti u string radi URL prikaza
        .expect(404)
        .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done);
    });

});
