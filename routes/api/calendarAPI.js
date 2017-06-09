import express from 'express';
import * as calendar from '../representation/calendar';
import * as error from '../representation/error';
import * as dao from '../../model/dao/calendarDAO';

const router = express.Router();

router.get('/', (req, res, next) => {
  calendar.calendarHandler(req, res);
});

router.get('/schedule', (req, res, next) => {
  // query likes: 2017-06-07
  // calendar.monthlyCalendarHandler(req, res);
  let token = req.get('Access-Token');
  let query = req.query.date;
  dao.monthly(token, query)
    .then(schedules => {
      calendar.monthlyCalendarHandler(req, res, schedules);
    }).catch(err => {
      errorHandler(req, res, {
        code: '1000',
        title: 'Error Ocurred',
        message: err
      });
    });
});

router.post('/schedule', (req, res, next) => {
  let calendarTemplate = calendar.createCalendarFromTemplate(req.body);

  dao.create(req.get('Access-Token'), calendarTemplate).then(value => {
    console.log('post value', value);
    var cType = 'application/json'
    res.status(200).set({
      'Content-Type': cType,
      'Access-Control-Allow-Origin': '*'
    }).end();
  }).catch(err => {
    error.errorHandler(req, res, {
      code: '1000',
      title: 'Error Ocurred',
      message: err
    })
  });
});

router.get('/schedule/template', (req, res, next) => {
  calendar.calendarTemplateHandler(req, res);
})

router.get('/schedule/:idx', (req, res, next) => {
  let idx = req.params.idx;

  dao.daily(idx).then(result => {
    calendar.dailyCalendarHandler(req, res, result);
  }).catch(err => {
    errorHandler(req, res, {
      code: '1000',
      title: 'Error Ocurred',
      message: err
    });
  });
});

module.exports = router;