const express = require("express");
const bodyParser = require("body-parser");


const app = express();

const port = process.env.PORT || 3007;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * * GET - Send the generate PDF to the client
 */
app.post("/", (req, res) => {
  console.log(req.body[0].payload.object);
  res.send(req.body);
});

app.listen(port, () => {
  console.log("Server on run " + port);
});

