var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')


//IMPORTING ROUTS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/products');



var app = express();

//CONNECTING TO MONGODB
mongoose.connect('mongodb://localhost:27017/shopping', {useUnifiedTopology:true, useNewUrlParser:true})
    .then(response => {
    console.log('Connected');
    }).catch(err => {
        console.log('Error in connecting to thee database');
    })

//ALLOWING CROSS ORIGIN ACCESS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders:"Content-type, Authentication, Origin, X-Requested-With, Accept"
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', usersRouter);

module.exports = app;
