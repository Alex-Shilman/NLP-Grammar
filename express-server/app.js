import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import index from './routes/index';
import users from './routes/users';
import compression from 'compression';
import studentData from '../resources/student_error';

const app = express();
const cacheStudentData = (req, res, next) => {
  req.session.studentData = req.session.studentData || studentData.examples;
  next();
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(session({
  secret: 'xxasfasfqeasjfasjgsas99r4',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', cacheStudentData, users);

// error handlers
[
  (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  },
  (err, req, res, next) => {
    // set locals, only providing error in development
    try {
      res.status(err.status || 500).json({
        message: err.message,
        ...err,
      });
    } catch (e) {
      res.status(err.status || 500).json({
        message: err.message,
      });
    }
    console.error('ERROR', err);
    throw err;
  },
].forEach(handler => app.use(handler));


module.exports = app;
