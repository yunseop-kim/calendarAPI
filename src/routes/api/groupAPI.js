import express from 'express';
import * as group from '../representation/group';
import * as error from '../representation/error';
import * as dao from '../../model/dao/groupDAO';
import { headerSet } from '../util/httpHeaders';
import { STATUS } from '../util/httpStatusCode';

const router = express.Router();

router.get('/', (req, res, next) => {
  group.groupHandler(req, res);
});

router.post('/', (req, res, next) => {
  let template = group.createGroupFromTemplate(req.body);
  let token = req.get('Access-Token');

  dao.create(template, token)
    .then(result => {
      res.status(STATUS.CREATED).set(headerSet).end();
    }).catch(err => {
      error.errorHandler(req, res, err);
    });
});

router.get('/list', (req, res, next) => {
  let token = req.get('Access-Token');

  dao.list().then(result => {
    group.groupListHandler(req, res, result);
  }).catch(err => {
    error.errorHandler(req, res, err);
  });
});

router.get('/template', (req, res, next) => {
  group.groupTemplateHandler(req, res);
});

router.get('/:idx', (req, res, next) => {
  let idx = req.params.idx;
  let token = req.get('Access-Token');

  dao.detail(idx, token).then(result => {
    group.groupDetailHandler(req, res, result);
  }).catch(err => {
    error.errorHandler(req, res, err);
  });
});

router.put('/:idx', (req, res, next) => {
  let idx = req.params.idx;
  let template = group.createGroupFromTemplate(req.body);
  let token = req.get('Access-Token');

  dao.modify(idx, template, token).then(result => {
    res.status(STATUS.NO_CONTENT).set(headerSet).end();
  }).catch(err => {
    error.errorHandler(req, res, err);
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

module.exports = router;