import express from 'express';
import * as login from '../representation/login';
import { errorHandler } from '../representation/error';
import * as dao from '../../model/dao/loginDAO';

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
            res.status(201).end();
        })
        .catch((err) => {
            errorHandler(req, res, {
                code: '1000',
                title: 'Error Ocurred',
                message: err
            })
        });
});

module.exports = router;