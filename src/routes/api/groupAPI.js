import express from 'express';
import * as group from '../representation/group';
import * as error from '../representation/error';
import * as dao from '../../model/dao/groupDAO';
import { headerSet } from '../util/httpHeaders';
import * as requestUrlUtil from '../util/requestUrlUtil';

const router = express.Router();

router.get('/', (req, res, next) => {
  group.groupHandler(req, res);
});

router.post('/', (req, res, next) => {
  let template = group.createGroupFromTemplate(req.body);
  let token = req.get('Access-Token');

  dao.create(template, token)
    .then(result => {
      res.status(200).set(headerSet).end();
    }, err => {
      error.errorHandler(req, res, {
        code: '1000',
        title: 'Error Ocurred',
        message: err
      });
    });
})

// router.get('/:year/:month/schedule', (req, res, next) => {
//   let token = req.get('Access-Token');
//   let { year, month } = req.params;

//   group.monthlyGroupHandler(req, res, year, month);
// });

// router.get('/:year/:month/:day/schedule', (req, res, next) => {
//   let { year, month, day } = req.params;
//   let date = year + month + day;
//   let token = req.get('Access-Token');

//   dao.daily(date, token).then(result => {
//     group.dailyGroupHandler(req, res, result);
//   }).catch(err => {
//     errorHandler(req, res, {
//       code: '1000',
//       title: 'Error Ocurred',
//       message: err
//     });
//   });
// });

// router.get('/:year/:month/:day/schedule/:idx', (req, res, next) => {
//   let idx = req.params.idx;
//   let token = req.get('Access-Token');

//   dao.detail(idx, token).then(result => {
//     group.groupDetailHandler(req, res, result);
//   }).catch(err => {
//     errorHandler(req, res, {
//       code: '1000',
//       title: 'Error Ocurred',
//       message: err
//     });
//   });
// });

// router.put('/:year/:month/:day/schedule/:idx', (req, res, next) => {
//   let groupTemplate = group.createGroupFromTemplate(req.body);
//   let idx = req.params.idx;
//   let token = req.get('Access-Token');

//   // todo: template validation check
//   // todo: make getAccessToken Util
//   dao.modify(idx, groupTemplate, token)
//     .then(result => {
//       res.status(200).set(headerSet).end();
//     }).catch(err => {
//       error.errorHandler(req, res, {
//         code: '1000',
//         title: 'Error Ocurred',
//         message: err
//       });
//     });
// });

// router.delete('/:year/:month/:day/schedule/:idx', (req, res, next) => {
//   let idx = req.params.idx;
//   let token = req.get('Access-Token');

//   dao.remove(idx, token)
//     .then(result => {
//       res.status(204).set(headerSet).end();
//     }).catch(err => {
//       error.errorHandler(req, res, {
//         code: '1000',
//         title: 'Error Ocurred',
//         message: err
//       });
//     });
// });

// router.post('/schedule', (req, res, next) => {
//   let groupTemplate = group.createGroupFromTemplate(req.body);
//   let token = req.get('Access-Token');
//   dao.create(groupTemplate, token).then(value => {
//     res.status(200).set(headerSet).end();
//   }).catch(err => {
//     error.errorHandler(req, res, {
//       code: '1000',
//       title: 'Error Ocurred',
//       message: err
//     });
//   });
// });

// router.get('/template', (req, res, next) => {
//   group.groupTemplateHandler(req, res);
// })

module.exports = router;