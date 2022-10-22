const User = require("../../model/user");
const app = require("../../app"); // my express app
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const should = chai.should();

describe("Authenticate", () => {
  beforeEach((done) => {
    const user = {
      first_name: "test user",
      last_name: "test user",
      email: "user@test.com",
      password: "testuser",
    };
    user.save().then((result) => {
      done();
    });
  });

  describe("/POST user login", () => {
    const user = {
      first_name: "test user",
      last_name: "test user",
      email: "user@test.com",
      password: "testuser",
    };
    it("it should login the user", (done) => {
      chai
        .request(app)
        .post("/login")
        .send(user)
        .end((err, res) => {
        //   if (err) {
        //     console.log(err);
        //   }
          res.should.have.status(200);
          // expect(res.body.token).to.be.a("string")
          done();
        });
    });
  });
});
