import express from 'express';
import * as calendar from '../representation/calendar';

const router = express.Router();

router.get('/', (req, res, next) => {
  calendar.calendarHandler(req, res);
});

router.get('/schedule', (req, res, next) => {
  // query likes: 2017-06-07
  calendar.monthlyCalendarHandler(req, res);
});

router.get('/schedule/:idx', (req, res, next) => {
  calendar.dailyCalendarHandler(req, res);
});

module.exports = router;