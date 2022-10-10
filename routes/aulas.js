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

router.post(`/create`, (req, res) => {
  let name = req.body.name;
  let plant = req.body.plant;
  let door = req.body.door;

  connection.query(`INSERT INTO aulas(nombre, planta, puerta) VALUES('${name}', '${plant}', '${door}')`, (err, resu) => {
    if (err) {
      return (JSON.stringify({'err': 1}));
    } else {
      return (JSON.stringify({'insertID': resu.insertId}));
    }
  })

})



module.exports = router;
