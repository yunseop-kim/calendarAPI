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
      res.status(201).set(headerSet).end();
    }, err => {
      error.errorHandler(req, res, {
        code: '1000',
        title: 'Error Ocurred',
        message: err
      });
    });
});

router.get('/list', (req, res, next) => {
  let token = req.get('Access-Token');

  dao.list().then(result => {
    group.groupListHandler(req, res, result);
  }).catch(err => {
    error.errorHandler(req, res, {
      code: '1000',
      title: 'Error Ocurred',
      message: err
    });
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
    error.errorHandler(req, res, {
      code: '1000',
      title: 'Error Ocurred',
      message: err
    });
  });
});

router.put('/:idx', (req, res, next) => {
  let idx = req.params.idx;
  let template = group.createGroupFromTemplate(req.body);
  let token = req.get('Access-Token');
  // todo: 수정 시 created도 바뀜.
  dao.modify(idx, template, token).then(result => {
    res.status(204).set(headerSet).end();
  }).catch(err => {
    error.errorHandler(req, res, {
      code: '1000',
      title: 'Error Ocurred',
      message: err
    });
  });
});

router.delete('/:idx', (req, res, next) => {
  let idx = req.params.idx;
  let token = req.get('Access-Token');

  dao.remove(idx, token)
    .then(result => {
      res.status(204).set(headerSet).end();
    }).catch(err => {
      error.errorHandler(req, res, {
        code: '1000',
        title: 'Error Ocurred',
        message: err
      });
    });
});

module.exports = router;