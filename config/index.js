let hostname = '';
let mongodbClient = '';
let port = 0;

hostname = '127.0.0.1';
port = 80;
mongodbClient = 'mongodb://localhost:27017/rentalcity';

module.exports = {

  hostname: hostname,
  mongodbClient: mongodbClient,
  port: port,
  development: true,
  production: false,
  jwtSecret: 'my secret',

};