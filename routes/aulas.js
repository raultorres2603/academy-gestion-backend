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

router.post(`/setAulas`, (req, res) => {

})



module.exports = router;
