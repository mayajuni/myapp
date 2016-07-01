const request = require('supertest');
require('should');

const server: any = request.agent('http://localhost:3000');

describe('테스트 시작', () => {
    it('GET', done => server.get('/').expect(200).expect("Content-type",/json/)
        .end((err, res) => {
            if(err) throw err;
            res.body.should.be.a.Object();
            res.body.should.have.property('result');
            res.body.result.should.equal('Hello World');
            done();
        }));
    it('POST', done => server.post('/').expect(200).expect("Content-type",/json/)
        .end((err, res) => {
            if(err) throw err;
            res.body.should.be.a.Object();
            res.body.should.have.property('result');
            res.body.result.should.equal('Hello World');
            done();
        }));
    it('DELETE', done => server.delete('/').expect(200).expect("Content-type",/json/)
        .end((err, res) => {
            if(err) throw err;
            res.body.should.be.a.Object();
            res.body.should.have.property('result');
            res.body.result.should.equal('Hello World');
            done();
        }));
    it('PUT', done => server.put('/').expect(200).expect("Content-type",/json/)
        .end((err, res) => {
            if(err) throw err;
            res.body.should.be.a.Object();
            res.body.should.have.property('result');
            res.body.result.should.equal('Hello World');
            done();
        }));
});