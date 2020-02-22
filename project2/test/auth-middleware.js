const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

const authMiddleware = require("../middleware/auth");

describe("Auth middleware", function() {
  it("should throw an error if no authorization header is present", function() {
    const req = {
      get: function() {
        return null;
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not Authenticated."
    );
  });

  it("should thorw an error if the authentication header is only one string.", function() {
    const req = {
      get: function(headerName) {
        return "xyz";
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should throw an error if the token cannot be verified", function() {
    const req = {
      get: function(headerName) {
        return "Bearer xyz";
      }
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
  it("should throw an error if does not have userId property", function() {
    const req = {
      get: function(headerName) {
        return "Bearer safasdfdfasdf";
      }
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });

    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
});
