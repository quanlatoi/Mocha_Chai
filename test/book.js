process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Book', () => {
    console.log('test')
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/ GET book', () => {
        it('it should GET all the book', (done) => {
            chai.request(server)
                .get('/book')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9); // fixme :)
                    done();
                });
        });
    });
});

describe('/POST book', () => {
    it('it should POST a book', (done) => {
        let book = {
            name: "Book10",
            status: "detected"
        };
        chai.request(server)
            .post('/book')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Book successfully added!');
                res.body.book.should.have.property('id');
                res.body.book.should.have.property('name').eql(book.name);
                res.body.book.should.have.property('status').eql(book.status);
                done();
            });
    });
    it('it should not POST a book without status field', (done) => {
        let book = {
            name: "Book10"
        };
        chai.request(server)
            .post('/book')
            .send(book)
            .end((err, res) => {
                console.log(res.body)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Book is invalid");
                done();
            });
    });
});

describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
        // TODO add a model to db then get that *id* to take this test
        let id = 1;
        chai.request(server)
            .get('/book/' + id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('book');
                res.body.book.should.have.property('id').eql(id);
                res.body.book.should.have.property('name');
                res.body.book.should.have.property('status');
                done();
            });
    });
});

describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', (done) => {
        // TODO add a model to db then get that id to take this test
        let id = 1;
        chai.request(server)
            .delete('/book/' + id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Book successfully deleted!');
                res.body.should.have.property('result');
                res.body.result.should.have.property('roweffected').eql(1);
                done();
            });
    });
});