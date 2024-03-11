const bodyParser = require("body_Parser");
app.use(bodyParser.json());
const express = require("express");
const app = express();
const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
}); //setting up the express server

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cruid_api",
});
connection.connect((error) => {
  if (error) {
    console.log("The database connection failed");
  } else {
    console.log("The database connection was succesful");
  }
});
//Perform a query on the database
// const query = "SELECT *FROM USERS";
// connection.query(query, (error, results, fields) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(results);
//   }
// });
//close the connection
// connection.end();
app.get("/ users", (req, res) => {
  connection.query("SELECT * FROM users", (err, date) => {
    if (err) {
      console.log("oops error");
      res.status(500).send("error retriving users");
    } else {
      res.send(date);
    }
  });
});
app.post("users", (res, req) => {
  const { name, email } = res.body;
  connection.query("INSERT INTO users(name,email) VALUES(?, ?)", [name, email]);
});
if (err) {
  console.log("Not updated into the database");
  res.status(500).send("error retriving users");
} else {
  res.send("users created succesfully ");
}
app.put("/users/:id", (req, res) => {
  //get the id from params
  const { id } = request.params.id;
  const { name, email } = req.body;
  connection.query(
    "UPDATE users SET name=?,email=? WHERE id=?",
    [name, email, id](error)
  );
});
if (err) {
  console.log("Not updated into the database");
  res.status(500).send("error updating  users");
} else {
  res.send("user updated  succesfully ");
}
app.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  connection.query("DELETE FROM users WHERE id = ?", [id], (error) => {
    if (error) {
      console.error(error);
      response.status(500).send("Error deleting user");
    } else {
      response.send("User deleted successfully");
    }
  });
});
