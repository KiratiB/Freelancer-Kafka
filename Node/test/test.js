var assert = require('assert');
var request = require('supertest');
var assert = require('chai').assert;
var app = require('../app');
var http = require('http');


it('Test case 1 - should respond with success flag on successful login', function (done) {
    this.timeout(500);
    setTimeout(done, 300);
    request(app).post('/users/doLogin')
        .send({"username":"mahiti","password":"mahiti123"})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(res.body.success, true);
            done();
        });
});


it('Test case 2 - should respond with 201 status and all the open projects', function (done) {
    request(app).post('/users/fetchProject')
        .send({})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(201, res.status);
            done();
        });
});

it('Test case 3 - should respond with 201 status and all the projects bidded by user', function (done) {
    request(app).post('/users/fetchmybids')
        .send({"user_id":"5ac994ee00c5de1030924a24"})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(201, res.status);
            done();
        });
});

it('Test case 4 - should respond with 201 status and all the users bidded on project', function (done) {
    request(app).post('/users/fetchprojectusers')
        .send({"project_id":"5ac99e30ecc2411fc49ed8ac"})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(201, res.status);
            done();
        });
});

it('Test case 5 - should respond with 201 status and add money to user account', function (done) {
    request(app).post('/users/addMyMoney')
        .send({"userId":"5ac99e30ecc2411fc49ed8ac","amount":100})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(201, res.status);
            done();
        });
});

it('Test case 6 - should respond with 201 status and all the projects posted by user', function (done) {
    request(app).post('/users/addMyMoney')
        .send({"userId":"5ac994ee00c5de1030924a24"})
        .expect(201)
        .end(function (err, res) {
            if (err) done(err);
            assert.equal(201, res.status);
            done();
        });
});

