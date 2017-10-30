// testiranje
// server.js treba biti listen 3000 (local port) a lokalna Mongo baza treba biti uključena:
// mongod.exe --dbpath c:/wamp/www/programi/2017/node_mead/mongo-data

const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');  // za fetchati ID

const {app} = require('./../server');  // relative path, zatim jedan dir natrag i onda fajl
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

// refactoring, maknuli smo ovaj kod u seed/seed.js
beforeEach(populateUsers);
beforeEach(populateTodos);


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

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'This should be the new text';

        request(app)
        .patch('/todos/' + hexId)
        .send({
            text: text,
            completed: true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done)
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'This should be the new text!!';

        request(app)
        .patch('/todos/' + hexId)
        .send({
            text: text,
            completed: false
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done)
    });
});

describe('GET /users/me', () => {
    // prvi test case
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)  // set header, name je x-auth, value je token prvog usera
            .expect(200) // očekujemo kod 200 tj OK
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });
    // drugi test
    it('should return 401 if not authenticated', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
    });    
});

describe('POST /users', () => {
    it('should create a user', (done) => {
        var email = 'example@example.com';
        var password = '123mnb!';
        
        request(app)
        .post('/users')
        .send({email, password})
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
            expect(res.body._id).toExist();
            expect(res.body.email).toBe(email);
        })
        .end(done);
    });
    
    it('should return validation errors if request invalid', (done) => {
       request(app)
        .post('/users')
        .send({
            email: 'and',
            password: '123'
        })
        .expect(400)
        .end(done) 
    });    
    
    it('should not create user if email in use', (done) => {
        request(app)
        .post('/users')
        .send({
            email: users[0].email,
            password: 'Password123!'
        })
        .expect(400)
        .end(done);
    });
});