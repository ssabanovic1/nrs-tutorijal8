let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();


const db = require("./db/gradovi");

var brojac = 0;

chai.use(chaiHttp);


describe('Testovi za 2 zadatak', function () {
    before(function () {
        chai.request(server)
        .delete('/deleteAll')
        .end();
    });

    beforeEach(function () {
        chai.request(server)
        .post('/grad')
        .send({naziv: "Sarajevo", broj_stanovnika: 555000})
        .end((err,res)=>{
            brojac = res.body.id;
        });
    });

    afterEach(function () {
        chai.request(server)
        .delete('/deleteAll')
        .end()
    });


 
    after(function () {
        chai.request(server)
        .delete('/deleteAll')
        .end()
    });
 
 
    it('Test svi podaci iz baze', function (done) {
        chai.request(server)
            .get('/gradovi')
            .end(function (err, res) { 
                res.statusCode.should.be.eql(200);
                res.body.should.be.a('array');  
                res.body[0].should.have.property('naziv');
                res.body[0].naziv.should.be.eql("Sarajevo");
                res.body[0].broj_stanovnika.should.be.eql(555000);                           
                done();
            });
    });

    it('Test get jedan grad iz baze', function (done) {
        chai.request(server)
            .get(`/gradovi/${brojac+1}`)
            .end(function (err, res) { 
                res.statusCode.should.be.eql(200);
                res.body.should.be.a('array'); 
                res.body[0].naziv.should.be.eql("Sarajevo");
                res.body[0].broj_stanovnika.should.be.eql(555000);                      
                done();
            });
    });

    it('Test update grad iz baze', function (done) {
        chai.request(server)
            .put(`/gradovi${brojac+1}`)
            .send({broj_stanovnika: 555321})
            .then(()=>{
                chai.request(server)
                .get(`/gradovi/${brojac}`)
                .end(function (err, res) { 
                res.statusCode.should.be.eql(200);
                res.body.should.be.a('array'); 
                res.body[0].naziv.should.be.eql("Sarajevo");
                res.body[0].broj_stanovnika.should.be.eql(555321);                      
                done();
            });
            });
    });

    /*it('Test delete grad iz baze', function (done) {
        chai.request(server)
            .delete(`/gradovi/${brojac}`)
            .end(function (err, res) { 
                res.body.success.should.be.eql(true);                      
                done();
            });
    });*/

});