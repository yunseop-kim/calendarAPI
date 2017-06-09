import express from 'express';
import * as login from '../representation/login';
import loginDAO from '../../model/dao/loginDAO';

const router = express.Router();

router.get('/', (req, res, next) => {
    login.loginHandler(req, res);
});

router.get('/template', (req, res, next) => {
    login.loginTemplateHandler(req, res);
});

router.post('/', (req, res, next) => {
    let loginTemplate = login.createLoginFromTemplate(req.body);
    let dao = new loginDAO(req, res, next);
    if (!loginTemplate) {
        // send error
        return;
    }

    dao.create(loginTemplate.email, loginTemplate.password);
});

module.exports = router;