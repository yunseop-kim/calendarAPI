import express from 'express';
import * as calendar from '../representation/calendar';
import * as error from '../representation/error';
import * as dao from '../../model/dao/calendarDAO';
import { headerSet } from '../util/httpHeaders';
import { STATUS } from '../util/httpStatusCode';
import * as util from '../util/requestUrlUtil';

const router = express.Router();

router.get('/', (req, res, next) => {
  let date = req.query.date;

  calendar.calendarScheduleHandler(req, res, date);
});

router.get('/template', (req, res, next) => {
  calendar.calendarTemplateHandler(req, res);
})

// It is unclear whether it represents only the selected group.
router.get('/find', (req, res, next) => {
  let search = req.query.query;
  let token = req.get('Access-Token');

  dao.find(search, token).then(result => {
    calendar.findCalendarHandler(req, res, result);
  }).catch(err => {
    error.errorHandler(req, res, err);
  });
});

router.get('/:idx', (req, res, next) => {
  let idx = req.params.idx;
  let token = req.get('Access-Token');

  dao.detail(idx, token).then(result => {
    calendar.calendarDetailHandler(req, res, result);
  }).catch(err => {
    error.errorHandler(req, res, err);
  });
});

router.put('/:idx', (req, res, next) => {
  let calendarTemplate = calendar.createCalendarFromTemplate(req.body);
  let idx = req.params.idx;
  let token = req.get('Access-Token');

  // todo: template validation check
  // todo: make getAccessToken Util
  dao.modify(idx, calendarTemplate, token)
    .then(result => {
      res.status(STATUS.NO_CONTENT).set(headerSet).end();
    }).catch(err => {
      error.errorHandler(req, res,err);
    });
});

router.delete('/:idx', (req, res, next) => {
  let idx = req.params.idx;
  let token = req.get('Access-Token');

  dao.remove(idx, token)
    .then(result => {
      res.status(STATUS.NO_CONTENT).set(headerSet).end();
    }).catch(err => {
      error.errorHandler(req, res, err);
    });
});

router.get('/:year/:month', (req, res, next) => {
  console.log('/:year/:month');
  let token = req.get('Access-Token');
  let { year, month } = req.params;

  calendar.monthlyCalendarHandler(req, res, year, month);
});

router.get('/:year/:month/:day', (req, res, next) => {
  let { year, month, day } = req.params;
  console.log(`${year}, ${month}, ${day}`);
  let date = year + '-' + month + '-' + day;
  let token = req.get('Access-Token');

  dao.daily(date, token).then(result => {
    calendar.dailyCalendarHandler(req, res, result);
  }).catch(err => {
    error.errorHandler(req, res, err);
  });
});

router.post('/', (req, res, next) => {
  let calendarTemplate = calendar.createCalendarFromTemplate(req.body);
  let token = req.get('Access-Token');
  dao.create(calendarTemplate, token).then(value => {
    res.status(STATUS.CREATED).set(headerSet).end();
  }).catch(err => {
    error.errorHandler(req, res, err);
  });
});

module.exports = router;