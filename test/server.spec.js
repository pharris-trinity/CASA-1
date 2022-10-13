const supertest = require("supertest");
const assert = require('assert');
const app = require("../server/server");
const { request } = require("http");

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

// describe("GET /api/display_user/63485f2047c6ed25ef61bd7a", function() {
  
//   it("it should have status code 200", (done) => {
//     const res = supertest(app).get("/api/display_user/63485f2047c6ed25ef61bd7a").send()
//     expect(res.status).toStrictEqual(200);
//     done();  
//   });
// });