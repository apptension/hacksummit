'use strict';

let express = require('express'),
  router = express.Router();

router.post('/', function(req, res, next) {
  req.logout();
  res.json({
    success: true
  });
});

module.exports = router;
