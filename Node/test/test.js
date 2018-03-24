var assert = require('assert');
var request = require('supertest');
var assert = require('chai').assert;
var app = require('../app');
var http = require('http');



it('Test case 1 - should respond with success flag on sign up', function (done) {
    request(app).post('/users/doSignUp')
        .send({"email":"adminKKB@123.com","username":"adminKKB","password":"admin123","role":"Work"})
        .expect(200)
        .end(function (err, res) {
             if (err) done(err);
             assert.equal(res.body.success, true);
             done();
    });
});

it('Test case 2 - should respond with success flag on successful login', function (done) {
    request(app).post('/users/doLogin')
        .send({"userID":"Nishant","password":"nishant123"})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(res.body.success, true);
            done();
        });
});


it('Test case 3 - should respond with 201 status and all the open projects', function (done) {
    request(app).post('/users/fetchProject')
        .send({})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(201, res.status);
            done();
        });
});

it('Test case 4 - should respond with 201 status and all the projects bidded by user', function (done) {
    request(app).post('/users/fetchmybids')
        .send({"userID":1})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(201, res.status);
            done();
        });
});

it('Test case 5 - should respond with 201 status and all the users bidded on project', function (done) {
    request(app).post('/users/fetchprojectusers')
        .send({"project_id":1})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(201, res.status);
            done();
        });
});


