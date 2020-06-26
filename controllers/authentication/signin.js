global.config = require('../../config/index');

const async = require('async');
const _ = require('underscore');
const { Map } = require('immutable');
const { check, validationResult } = require('express-validator');
const session = require('express-session');
const authentication = require('../../lib/authentication');
const emailLibrary = require('../../lib/email');

module.exports.postLogin = (req, res) => {
  const TAG = 'controllers/authentication/login.js | postLogin';
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(200).end(JSON.stringify({ errors: errors.array() }));
  }

  authentication.loginUser(req, res, (err, result) => {
    const emailMarkup = '<h1>'+ req.body.email +' Successfully logged in to RentalCity.</h1>';
    if(err) {
      return res.redirect('/');
    }
    return res.redirect('/')
  });
}