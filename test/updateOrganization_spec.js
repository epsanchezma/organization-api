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

  describe('/UPDATE organization', () => {
    var token = '';
    var id = '';
    var organization = {
        name: "Juanito Bookstore",
        description: "Best Bookstore",
        url: "www.juanitobook.com",
        code: "123",
        orgType: "store"
      };

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

    it('it should UPDATE an specific organization', (done) => {
      chai.request(server.listener)
        .post('/api/organizations')
        .send(organization)
        .set('Authorization', 'Bearer '+ token)
        .then((res) => {
          var result = JSON.parse(res.text);
          id = result._id;
          chai.request(server.listener)
            .patch('/api/organizations/' + id)
            .set('Authorization', 'Bearer '+ token)
            .send({description: "Best Bookstore Ever"})
            .end((err, res) => {
                res.should.have.status(204);
              done();
            });
        })
        .catch((err) =>{
          throw err;
        }); 
    });
  });
});
