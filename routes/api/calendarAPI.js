import express from 'express';
import * as calendar from '../representation/calendar';
import * as error from '../representation/error';
import * as dao from '../../model/dao/calendarDAO';

const router = express.Router();
let cType = 'application/json'

router.get('/', (req, res, next) => {
  calendar.calendarHandler(req, res);
});

router.get('/:year/:month/schedule', (req, res, next) => {
  let token = req.get('Access-Token');
  let { year, month } = req.params;

  calendar.monthlyCalendarHandler(req, res, year, month);
});

router.get('/:year/:month/:day/schedule', (req, res, next) => {
  let { year, month, day } = req.params;
  let date = year + month + day;
  let token = req.get('Access-Token');

  dao.daily(date, token).then(result => {
    calendar.dailyCalendarHandler(req, res, result);
  }).catch(err => {
    errorHandler(req, res, {
      code: '1000',
      title: 'Error Ocurred',
      message: err
    });
  });
});

router.get('/:year/:month/:day/schedule/:idx', (req, res, next) => {
  let idx = req.params.idx;
  let token = req.get('Access-Token');

  dao.detail(idx, token).then(result => {
    calendar.calendarDetailHandler(req, res, result);
  }).catch(err => {
    errorHandler(req, res, {
      code: '1000',
      title: 'Error Ocurred',
      message: err
    });
  });
});

router.put('/:year/:month/:day/schedule/:idx', (req, res, next) => {
  let calendarTemplate = calendar.createCalendarFromTemplate(req.body);
  let idx = req.params.idx;
  let token = req.get('Access-Token');

  // todo: template validation check
  // todo: make getAccessToken Util
  dao.modify(idx, calendarTemplate, token)
    .then(result => {
      res.status(200).set({
        'Content-Type': cType,
        'Access-Control-Allow-Origin': '*'
      }).end();
    }).catch(err => {
      error.errorHandler(req, res, {
        code: '1000',
        title: 'Error Ocurred',
        message: err
      });
    });
});

router.delete('/:year/:month/:day/schedule/:idx', (req, res, next) => {
  let idx = req.params.idx;
  let token = req.get('Access-Token');

  dao.remove(idx, token)
    .then(result => {
      res.status(204).set({
        'Content-Type': cType,
        'Access-Control-Allow-Origin': '*'
      }).end();
    }).catch(err => {
      error.errorHandler(req, res, {
        code: '1000',
        title: 'Error Ocurred',
        message: err
      });
    });
});

router.post('/schedule', (req, res, next) => {
  let calendarTemplate = calendar.createCalendarFromTemplate(req.body);

  dao.create(req.get('Access-Token'), calendarTemplate).then(value => {
    res.status(200).set({
      'Content-Type': cType,
      'Access-Control-Allow-Origin': '*'
    }).end();
  }).catch(err => {
    error.errorHandler(req, res, {
      code: '1000',
      title: 'Error Ocurred',
      message: err
    });
  });
});

router.get('/template', (req, res, next) => {
  calendar.calendarTemplateHandler(req, res);
})

module.exports = router;