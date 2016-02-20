'use strict';

let express = require('express'),
  router = express.Router(),
  models = require('../models');

router.post('/', function(req, res, next) {
  models.User.findById(parseInt(req.body.userId)).then((user) => {
    if (user) {
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json({
          success: true
        });
      });
    } else {
      return res.status(404).json({ error: 'user not found' });
    }
  });
});

module.exports = router;
