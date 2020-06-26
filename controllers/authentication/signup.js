global.config = require('../../config/index');

const async = require('async');
const _ = require('underscore');
const { Map } = require('immutable');
const { check, validationResult } = require('express-validator');
const session = require('express-session');
const authentication = require('../../lib/authentication');
const emailLibrary = require('../../lib/email');

module.exports.registerPage = (req, res) => {
  res.render('pages/authentication/signup/index');
}

module.exports.postRegister = (req, res) => {
  authentication.registerUser(req, res, (err, result) => {
    if(err) {
     return res.redirect('/signup');
    }
    return res.redirect('/');
  });
}

module.exports.verifyAccount = (req, res) => {
  const TAG = 'controllers/authentication/register.js | verifyAccount';
  authentication.verifyAccount(req, res, (err, result) => {
    if(err) {
      const pageTitle = "Permission Denied";
      const errorMessage = "You don't have a permission to access this page!";
      return res.render('error-pages/permission-denied', {
        pageTitle: pageTitle,
        errorMessage: errorMessage
      });
    }
    req.session.accountActivatedEmail = result.email;
    req.session.accountActivated = true;
    return res.redirect('/');
  });
}