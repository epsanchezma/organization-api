'use strict';
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Organization = require('../api/organizations/model/Organization');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(require('chai-things'));
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

    it('it should GET all the organizations filtering by name', (done) => {
      chai.request(server.listener)
        .get('/api/organizations')
        .query({name: 'Candyland'})
        .set('Authorization', 'Bearer '+ token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.organizations.should.be.a('array');
            res.body.organizations.should.all.not.have.property('code');
          done();
        });
    });

    it('it should GET all the organizations filtering by code', (done) => {
      chai.request(server.listener)
        .get('/api/organizations')
        .query({code: '123'})
        .set('Authorization', 'Bearer '+ token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.organizations.should.be.a('array');
            res.body.organizations.should.all.have.property('code');
          done();
        });
    });
  });
});
