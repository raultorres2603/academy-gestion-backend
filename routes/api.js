var express = require("express");
var router = express.Router();
var config = require("../bin/config.json");
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

/* GET home page. */
router.post("/login", function (req, res, next) {
  if (req.body.username && req.body.password) {
    connection.query(
      `SELECT COUNT(*) as cont FROM users WHERE username = '${req.body.username}'`,
      (err, resu) => {
        if (err) {
          res.send(JSON.stringify({ error: "2" }));
          console.log(JSON.stringify({ error: "2" }));
        } else {
          if (resu[0].cont == 0) {
            connection.query(
              `INSERT INTO users(username, password) VALUES('${req.body.username}','${req.body.password}')`,
              (err, resu) => {
                if (err) {
                  res.send(JSON.stringify({ error: "3" }));
                  console.log(JSON.stringify({ error: "3" }));
                } else {
                  res.send(
                    JSON.stringify({ message: "new", user: resu.insertId })
                  );
                  console.log(
                    JSON.stringify({ message: "new", user: resu.insertId })
                  );
                }
              }
            );
          } else {
            connection.query(
              `SELECT idUser FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`,
              (err, resu) => {
                if (err) {
                  res.send(JSON.stringify({ error: "2" }));
                  console.log(JSON.stringify({ error: "2" }));
                } else {
                  if (resu[0].idUser > 0) {
                    res.send(
                      JSON.stringify({ message: "exist", user: resu[0].idUser })
                    );
                    console.log(
                      JSON.stringify({ message: "exist", user: resu[0].idUser })
                    );
                  } else {
                    res.send(
                      JSON.stringify({ error: "4" })
                    );
                  }
                }
              }
            );
          }
        }
      }
    );
  } else {
    res.send(JSON.stringify({ error: "1" }));
  }
});

module.exports = router;
