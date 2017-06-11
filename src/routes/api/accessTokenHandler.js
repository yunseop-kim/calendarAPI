import co from 'co';
import * as db from '../../model/util/db';
import { errorHandler } from '../representation/error';

function accessTokenHandler(req, res, next) {
    co(function* () {
        let token = req.get('Access-Token');
        let sql = 'DELETE FROM access_token WHERE expired <= ?';
        let params = [new Date()];
        let result = yield db.query(sql, params);

        sql = 'SELECT * FROM access_token WHERE token=? LIMIT 1';
        params = [token];
        result = yield db.query(sql, params);

        if (result.length < 1) {
            return Promise.reject({
                code: '4000',
                title: 'Security Error',
                message: 'Authentication Required!'
            });
        }

        return result[0];
    }).then((result) => {
        let accessToken = result.token;
        req.accessToken = accessToken;
        next();
    }, err => {
        errorHandler(req, res, err)
    });
}

module.exports = accessTokenHandler;