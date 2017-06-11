import { headerSet } from '../util/httpHeaders';
import * as util from '../util/requestUrlUtil';
import { STATUS } from '../util/httpStatusCode';
import { ERROR } from '../util/error';

let cj = {};

function errorHandler(req, res, error) {
    let href = util.getUrlByAppendPath(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;
    cj.collection.error = {};
    cj.collection.error = error;

    if (error.code === ERROR.UNKNOWN.code) {
        res.status(STATUS.BAD_REQUEST).send(JSON.stringify(cj));
    }
    if (error.code === ERROR.SQL.code) {
        res.status(STATUS.BAD_REQUEST).send(JSON.stringify(cj));
    }
    if (error.code === ERROR.REQUIRED_FIELD_MISSING.code) {
        res.status(STATUS.BAD_REQUEST).send(JSON.stringify(cj));
    }
    if (error.code === ERROR.INVALID_INPUT.code) {
        res.status(STATUS.BAD_REQUEST).send(JSON.stringify(cj));
    }
    if (error.code === ERROR.RESOURCE_CONFLICT.code) {
        res.status(STATUS.CONFLICT).send(JSON.stringify(cj));
    }
    if (error.code === ERROR.EMPTY_VALUE.code) {
        res.status(STATUS.BAD_REQUEST).send(JSON.stringify(cj));
    }
    if (error.code === ERROR.CAN_NOT_FIND_ACCOUNT.code) {
        res.status(STATUS.NOT_FOUND).send(JSON.stringify(cj));
    }
    if (error.code === ERROR.CAN_NOT_CREATE_RESOURCE.code) {
        res.status(STATUS.BAD_REQUEST).send(JSON.stringify(cj));
    }
    if (error.code === ERROR.RESOURCE_NOT_FOUND.code) {
        res.status(STATUS.NOT_FOUND).send(JSON.stringify(cj));
    }
    if (error.code === ERROR.AUTHENTICATION_REQUIRED.code) {
        res.status(STATUS.UNAUTHORIZED).set('WWW-Authenticate', 'OAuth').send(JSON.stringify(cj));
    }
}

export { errorHandler };