const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth Controller", function() {
  before(function(done) {
    mongoose
      .connect(
        "mongodb+srv://xiaoming:111@cluster0-fvtw9.mongodb.net/test-message?retryWrites=true"
      )
      .then(result => {
        const user = new User({
          name: "test1",
          email: "test@test.com",
          password: "aaaaaa",
          posts: [],
          _id: "5e33d0cabaea4935fbb23f66"
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });
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
    const req = {
      userId: "5e33d0cabaea4935fbb23f66"
    };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.userStatus = data.status;
      }
    };
    AuthController.getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal("I am new!");
      done();
    });
  });
  after(function(done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
