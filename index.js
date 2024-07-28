var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const dotenv=require("dotenv");
const recipes=require("./routers/recipes")
var app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config({
  path:"./config/env/config.env"
})
const PORT = process.env.PORT;

var r = require("rethinkdbdash")({
  servers: [
    {
      host: "localhost",
      port: 28015,
    },
  ],
});

const intialDataBase = async () => {
  const tables = await r.db("test").tableList();
  if (!tables.includes("recipe")) {
    await r.tableCreate("recipe").run();
  }
};
intialDataBase();

app.use("/api/questions",recipes);


app.listen(PORT, () => {
  console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});
