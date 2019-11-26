/**
 * in case you want to integrate a server
 */

const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const port = process.env.PORT || 3001;

/**
 * Middelwares
 */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/test", (req, res) => {
  res.send("TEST");
});

app.listen(port, () => {
  console.log("Server on run " + port);
});
