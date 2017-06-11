import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import root from './routes/api/rootAPI';
import login from './routes/api/loginAPI';
import calendar from './routes/api/calendarAPI';
import group from './routes/api/groupAPI';
import accessTokenHandler from './routes/api/accessTokenHandler';

const app = express();
app.disable('x-powered-by');

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', root);
app.use('/login', login);
app.use('/calendar', [accessTokenHandler, calendar]);
app.use('/group', [accessTokenHandler, group]);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
