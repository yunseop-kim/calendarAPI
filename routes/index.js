import express from 'express';
import * as root from './representation/root';
import * as login from './representation/login';
import loginDAO from '../model/dao/loginDAO';
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

router.post('/login', (req, res, next)=>{
  let loginTemplate = login.createLoginFromTemplate(req.body);
  let dao = new loginDAO(req, res);
  if(!loginTemplate){
    // send error
    return;
  }

  dao.create(loginTemplate.email, loginTemplate.password);

  // create access token
  // res.set('Access-Token', token);
  // res.status(201).end();
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