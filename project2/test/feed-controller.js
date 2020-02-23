const mongoose = require("mongoose");
const expect = require("chai").expect;
const sinon = require("sinon");

const User = require("../models/user");
const FeedController = require("../controllers/feed");

describe("Feed Controller", function() {
  before(function(done) {
    mongoose
      .connect(
        "mongodb+srv://xiaoming:111@cluster0-fvtw9.mongodb.net/test-message?retryWrites=true"
      )
      .then(result => {
        const user = new User({
          email: "test@test.com",
          password: "aaaaaa",
          name: "test1",
          posts: [],
          _id: "5e33d0cabaea4935fbb23f66"
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });

  it("should create a post and add the posts of the creator ", function(done) {
    const req = {
      body: {
        title: "test title",
        content: "test content"
      },
      file: {
        path: "abc"
      },
      userId: "5e33d0cabaea4935fbb23f66"
    };
    const res = {
      status: function() {
        return this;
      },
      json: function() {}
    };
    FeedController.createPost(req, res, () => {}).then(savedUser => {
      expect(savedUser).to.have.property("posts");
      expect(savedUser).posts.to.have.length(1);
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
