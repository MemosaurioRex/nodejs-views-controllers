//  Config
let express = require('express');
let engine = require('ejs-mate');
let path = require('path');
let morgan = require('morgan');
let passport = require('passport');
let session = require('express-session');
let flash = require('connect-flash');
let expressLayouts = require('express-ejs-layouts');
let methodOverride = require('method-override');

//  Calls Routes
let RouterIndex = require("./routes/index");

//  Init
let app = express();
require('./database');
require('./passport/local-auth');

//  Settings
app.use(expressLayouts);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');

//  Middlewares
app.use(morgan('dev')),
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.user = req.user;
    next();
});

//  Routes
app.use('/', RouterIndex);

//  Run Server
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en puerto ', app.get('port'), ' :)');
});
