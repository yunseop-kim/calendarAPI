import express from 'express';
import * as login from '../representation/login';
import { errorHandler } from '../representation/error';
import * as dao from '../../model/dao/loginDAO';
import { STATUS } from '../util/httpStatusCode';

const router = express.Router();

router.get('/', (req, res, next) => {
    login.loginHandler(req, res);
});

router.get('/template', (req, res, next) => {
    login.loginTemplateHandler(req, res);
});

router.post('/', (req, res, next) => {
    let loginTemplate = login.createLoginFromTemplate(req.body);

    if (!loginTemplate) {
        // send error
        return;
    }

    dao.create(loginTemplate.email, loginTemplate.password)
        .then((result) => {
            let token = result[0].token;
            res.set('Access-Token', token);
            res.status(STATUS.CREATED).end();
        })
        .catch((err) => {
            errorHandler(req, res, err)
        });
});

module.exports = router;