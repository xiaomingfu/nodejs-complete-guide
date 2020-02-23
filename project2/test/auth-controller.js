const expect = require("mocha").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller - signin", function() {
  it("should throw an error with code 500 if accessing the database fails", function(done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "aaaaaa"
      }
    };
    AuthController.login(req, {}, () => {}).then(result => {
      console.log(result);
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });

    User.findOne.restore();
  });

  it("should send a valid user status for an existing user", function(done) {
    mongoose
      .connect(
        "mongodb+srv://xiaoming:111@cluster0-fvtw9.mongodb.net/test-message?retryWrites=true"
      )
      .then(result => {
        const user = new User({
          username: "test",
          email: "test@test.com",
          password: "aaaaaa",
          posts: []
        });
        return user.save();
      })
      .then(() => {})
      .catch(err => console.log(err));
  });
});
