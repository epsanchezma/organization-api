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

  describe('/POST organization', () => {
    var token = '';

    beforeEach((done) => {
        Organization.remove({}, (err) => { 
           done();         
        });     
    });

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

    it('it should NOT CREATE an organization if any field is missing', (done) => {
      let organization = {
        name: "Juanito Bookstore",
        description: "Best Bookstore",
        url: "www.juanitobook.com",
        orgType: "store"
      };

      chai.request(server.listener)
        .post('/api/organizations')
        .set('Authorization', 'Bearer '+ token)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('it should CREATE an organization', (done) => {
      let organization = {
        name: "Juanito Bookstore",
        description: "Best Bookstore",
        url: "www.juanitobook.com",
        code: "123",
        orgType: "store"
      };

      chai.request(server.listener)
        .post('/api/organizations')
        .send(organization)
        .set('Authorization', 'Bearer '+ token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
