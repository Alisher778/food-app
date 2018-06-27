var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api/user', function(req, res, next) {
  res.json({"id": "1234", "user":"Alisher"});
});

module.exports = router;
