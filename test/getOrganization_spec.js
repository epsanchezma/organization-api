'use strict';
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Organization = require('../api/organizations/model/Organization');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Organization', () => {

  describe('/GET organization', () => {
    var token = '';

    before((done) => {
      chai.request(server.listener)
        .post('/api/users/authenticate')
        .field('email', 'epsanchezma@gmail.com')
        .field('password', 'qwerty')
        .end(function(err, res) {
          var result = JSON.parse(res.text);
          token = result.id_token;
          done();
        });   
    });

    it('it should GET all the organizations', (done) => {
      chai.request(server.listener)
        .get('/api/organizations')
        .set('Authorization', 'Bearer '+ token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.organizations.should.be.a('array');
          done();
        });
    });
  });
});
