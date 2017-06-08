import express from 'express';
import * as root from './representation/root';
import * as login from './representation/login';
import * as calendar from './representation/calendar';
const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  root.handler(req, res);
});

router.get('/login', (req, res, next) => {
  login.loginHandler(req, res);
});

router.get('/login/template', (req, res, next) => {
  login.loginTemplateHandler(req, res);
});

router.get('/calendar', (req, res, next) => {
  calendar.calendarHandler(req, res);
});

router.get('/calendar/schedule', (req, res, next) => {
  // query likes: 2017-06-07
  calendar.monthlyCalendarHandler(req, res);
});

router.get('/calendar/schedule/:idx', (req, res, next) => {
  calendar.dailyCalendarHandler(req, res);
});

export default router;