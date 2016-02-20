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
    })
  }
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.json({
    success: true
  });
});

module.exports = router;
