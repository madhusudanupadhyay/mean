var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function() {
    var app = express();
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());


    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // Setting view engine
    // app.set('views', './app/views');
    // app.set('view engine', 'html');


    // Trying to render html file.
    app.get('/', function(req, res) {

        res.sendFile('/Users/beast/mean/app/views/');

    });

    app.use(passport.initialize());
    app.use(passport.session());

    // // This will be the enum opertor that will help the user choose from within the specified list of credentials available in the databse
    // app.get('/error.html', function(req, res) {
    //     res.send('/user/beast/mean/app/views');
    // });

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes')(app);


    app.use(express.static('./public'));


    return app;
};