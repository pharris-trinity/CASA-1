const supertest = require("supertest");
const app = require("../server/server");
const chai = require('chai')
const expect = chai.expect;

describe("GET /api", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/api")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe("GET /api/database", function() {
  it("it should have status code 201", function(done) {
    supertest(app)
    .get("/api/database")
    .expect(200)
    .end(function(err, res) {
      if(err) done(err);
      done();
    });
  });
});

describe("GET /api/display_user/63485f2047c6ed25ef61bd7a", function() {
  it("it should have status code 200 and username 'a'", () => {
    let result;
    supertest(app).get("/api/display_user/63485f2047c6ed25ef61bd7a")
                .send()
                .end((err, res) => {
                  result = res.body
                  expect(res.status).to.eq('200')
                  expect(res.body.username).to.eq('a')
                  done()
                })
  });
});