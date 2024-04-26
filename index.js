const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 3000;
const moongoose = require("mongoose");
dotenv.config();

moongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected to momgo")).catch((err)=> console.log(err));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || port, () =>
  console.log("Example app listening on port " + process.env.PORT)
);
