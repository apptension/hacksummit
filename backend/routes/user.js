'use strict';

let express = require('express'),
  router = express.Router(),
  models = require('../models');

router.get('/', (req, res, next) => {
  if (req.user) {
    return res.json(req.user);
  } else {
    return res.status(401).json({
      error: 'log in first!'
    });
  }
});

module.exports = router;
