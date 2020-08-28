var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const firebase = require("firebase");

const { graphqlHTTP } = require("express-graphql");

const cors = require('cors');

const config = {
    apiKey: "AIzaSyAJMNO8eCw0N41KJbtnRibmpkzzpvRbQug",
    authDomain: "phonebook-79368.firebaseapp.com",
    databaseURL: "https://phonebook-79368.firebaseio.com",
    projectId: "phonebook-79368",
    storageBucket: "phonebook-79368.appspot.com",
    messagingSenderId: "78729981087"
  };
firebase.initializeApp(config);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('*', cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);


const phoneSchema = require('./graphql').phoneSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: phoneSchema,
  rootValue: global,
  graphiql: true
}));

module.exports = app;
