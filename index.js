const express = require("express");
const dotenv = require("dotenv");
const app = express();
const port = 3000;
const moongoose = require("mongoose");
const jobRouter=require("./routes/jobRoutes");
const bodyParser=require('body-parser');
dotenv.config();

moongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected to momgo")).catch((err)=> console.log(err));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/jobs',jobRouter)
app.listen(process.env.PORT || port, () =>
  console.log("Example app listening on port " + process.env.PORT)
);
