global.config = require('./config/index');
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');
const mongodbConnect = require('./config/database').mongodbConnect;
const csrf = require('csurf');
const csrfProtection = csrf();
const upload = require('express-fileupload');

app.set('port', global.config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: 'my session',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(upload({useTempFiles: true}));

app.use((req, res, next) => {
  next();
});

app.use('/api', apiRoutes);
app.use('/', webRoutes);

app.use((req, res, next) => {
  res.status(404);
  res.end("Can't find this page!");
});
mongodbConnect(() => {
  app.listen(global.config.port, global.config.hostname, () => {
    console.log("RentalCity is listening on port " + global.config.port);
  });

});



module.exports = app;