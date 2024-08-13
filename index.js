var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const {r} = require("./database");
const dotenv=require("dotenv");
const recipes=require("./routers/recipes")
const users=require("./routers/auth")
var app = express();
app.use(cors());
app.use(bodyParser.json());

dotenv.config({
  path:"./config/env/config.env"
})
const PORT = process.env.PORT;
const initialDbCreate =(temp)=>{
  r.dbList()
    .contains(temp)
    .do(function(dbExists) {
      return r.branch(
        dbExists,
        { created: 0 },
        r.dbCreate(temp)
      );
    })
    .run();

}
initialDbCreate("users");
initialDbCreate("recipes")
const intialTableCreate = async (dbName,tableName) => {
  const tables = await r.db(dbName).tableList();
  if (!tables.includes(tableName)) {
    await r.db(dbName).tableCreate(tableName).run();
  }

};
intialTableCreate("recipes","recipe");
intialTableCreate("users","user");
app.use("/api/recipes",recipes);
app.use("/api/users",users)


app.listen(PORT, () => {
  console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
});
