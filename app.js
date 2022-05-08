var express = require('express');
var app = express();
var path =  require('path');
var expresshbs = require('express-handlebars');
var bodyparser = require('body-parser');
const mysql = require("mysql");
const dotenv = require('dotenv');
var async = require('async');


const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
var expressValidator = require('express-validator');

const mysqlapp = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');

/* Initializations */
require('./lib/passport');



dotenv.config({path:'./.env'});


var PORT = process.env.PORT || 4500;


// app.engine('hbs', expresshbs.engine({defaultlayout:'base',extname:'hbs'}));
app.engine('hbs', expresshbs.engine({defaultlayout:'base',extname:'.hbs',

layoutsDir: path.join(app.get('views'), 'layouts'),
partialsDir: path.join(app.get('views'), 'partials'),
helpers: require('./lib/handlebars')}));
//viewss
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath)); 



//middlewares 
app.use(bodyparser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/* Middlewars */
app.use(session({
    secret: 'crud_links_session',
    resave: false,
    saveUninitialized: false,
    store: new mysqlapp(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

/* Global Variables */
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

/* Routes */
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));




//routes 

// admin routes 
var indexrouter = require('./routes/index');
var questionrouter = require('./routes/question');
var settings = require('./routes/settings');

// var question2router = require('./routes/question');

var regrouter = require('./routes/register');
var logrouter = require('./routes/login');

// routes location
app.use('/index', indexrouter);
app.use('/question', questionrouter);
app.use('/question2', questionrouter);

app.use('/question/edit', questionrouter);
app.use('/question/edit2', questionrouter);



// app.use('/', pagesrouter);


app.use('/',require('./routes/pages'));
app.use('/',require('./routes/page2'));
app.use('/',require('./routes/page3'));
app.use('/',require('./routes/page31'));

app.use('/',require('./routes/page4'));
app.use('/',require('./routes/page5'));

app.use('/assess',require('./routes/assess'));

app.use('/auth',require('./routes/auth'));
app.use('/auth2',require('./routes/auth2'));
app.use('/', settings);


// admin routes locations

// app.use('/index', indexrouter);
// app.use('/question', questionrouter);
app.use('/register', regrouter);
app.use('/login', logrouter);



app.listen(PORT, ()=>{

    console.log('server runinng 4500');
})