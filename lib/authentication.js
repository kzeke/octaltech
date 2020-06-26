global.config = require('../config/index');
const getDb = require('../config/database').getDb;
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const session = require('express-session');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

module.exports.registerUser = (req, res, cb) => {
  const TAG = 'lib/authentication.js | registerUser';
  const db = getDb();

  db.collection('users').findOne({email: req.body.email}).then(user => {
    if(!user) {
      crypto.randomBytes(32, (err, buffer) => {
        if(err) {
          cb(err);
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err) {
            console.log(`${TAG}: ${err}`);
            cb(err);
          } else {
            const token = buffer.toString('hex');
            let firstname = req.body.firstname.replace( /\s\s+/g, ' ' );
            let lastname = req.body.lastname.replace( /\s\s+/g, ' ' );
            db.collection('users').insertOne({
              firstname: firstname.trim(),
              lastname: lastname.trim(),
              email: req.body.email,
              password: hash,
            }).then(result => {
              cb(null);
            }).catch(err => {
              cb(err);
            });
          }
        });
      });
    } else {
      cb("This user is already existing in the record.");
    }
  }).catch((err) => {
    console.log(`${TAG}: ${err}`);
    cb(err);
  });  
}

module.exports.loginUser = (req, res, cb) => {
  const TAG = 'lib/authentication.js | loginUser';
  const db = getDb();
  const email = req.body.email;
  const password = req.body.password;
  db.collection('users').findOne({email: email, isEmailVerified: true, emailVerifiedAt:{$exists: true}})
  .then(user => {
    if(!user) {
      cb('Authentication Failed!');
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if(result) {
        cb(null, 'Auth Success');
      }

      cb('Authentication Failed!');
    });
    
  })
  .catch(err => {
    console.log(`${TAG}: ${err}`);
    cb('Authentication Failed!');
  });
}

