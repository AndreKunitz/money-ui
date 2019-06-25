const express = require("exprress");

const app = express();

app.use(express.static(__dirname + "/dist"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname, "/dist/index.html");
});

app.listen(process.env.PORT || 4200);
