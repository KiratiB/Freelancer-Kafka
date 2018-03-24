var assert = require('assert');
var request = require('supertest');
var assert = require('chai').assert;
var app = require('../routes');
var http = require('http');


    it('Test case 0 - should respond with success flag on', function (done) {
       request(app).post('/users/doSignUp')
            .send({"email":"a@a.com","username":"qwe","password":"qwe445","role":"Work"})
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                assert.equal(res.body.success, true);
                done();
            });
    });
