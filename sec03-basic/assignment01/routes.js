const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write(
      "<head><title>register page</title><body><form action='/create-user' method='POST'><input name='username'/><button type='submit'>submit</button></form></body></head>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write(
      "<head><title>user list</title><body><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body></head>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write(
    "<head><title>node basic concept assignment</title><body><h1>Hi, This is from server side</h1></body></head>"
  );
  res.write("</html>");
  res.end();
};

module.exports = { handler: requestHandler };
