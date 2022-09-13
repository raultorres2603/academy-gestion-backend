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
  if ((req.body.username && req.body.password) && (req.body.username.length > 5 && req.body.password.length > 5)) {
    connection.query(
      `SELECT COUNT(*) as cont FROM users WHERE username = '${req.body.username.toUpperCase()}'`,
      (err, resu) => {
        if (err) {
          res.send(JSON.stringify({ error: "2" }));
          console.log(JSON.stringify({ error: "2" }));
        } else {
          if (resu[0].cont == 0) {
            connection.query(
              `INSERT INTO users(username, password) VALUES('${req.body.username.toUpperCase()}','${req.body.password.toUpperCase()}')`,
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
              `SELECT idUser FROM users WHERE username = '${req.body.username.toUpperCase()}' AND password = '${req.body.password.toUpperCase()}'`,
              (err, resu) => {
                if (err) {
                  res.send(JSON.stringify({ error: "2" }));
                  console.log(JSON.stringify({ error: "2" }));
                } else {
                  if (typeof resu[0] !== 'undefined') {
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

router.post("/userInfo", function (req, res, next) {
  connection.query(`SELECT firstName, secondName, type, nif, tel, country, city FROM users WHERE idUser = ${req.body.idUser}`, (err, resu) => {
    if (err) {
      res.send(JSON.stringify({ error: "1" }));
      console.log(JSON.stringify({ error: "1" }));
    } else {
      res.send(JSON.stringify({ firstName: resu[0].firstName, secondName: resu[0].secondName, type: resu[0].type, nif: resu[0].nif, tel: resu[0].tel, country: resu[0].country, city: resu[0].city }));
      console.log(JSON.stringify({ firstName: resu[0].firstName, secondName: resu[0].secondName, type: resu[0].type, nif: resu[0].nif, tel: resu[0].tel, country: resu[0].country, city: resu[0].city }));
    }
  });
});

router.post("/updateUser", function (req, res, next) {
  connection.query(`UPDATE users SET firstName = '${req.body.firstName}', secondName = '${req.body.secondName}', nif = '${req.body.nif}', tel = '${req.body.tel}', country = '${req.body.country}', city = '${req.body.city}' WHERE idUser = ${req.body.idUser}`, (err, resu) => {
    if (err) {
      res.send(JSON.stringify({ error: "1" }));
      console.log(JSON.stringify({ error: "1" }));
    } else {
      res.send(JSON.stringify({ message: "ok" }));
      console.log(JSON.stringify({ message: "ok" }));
    }
  })
});

module.exports = router;
