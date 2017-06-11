import { headerSet } from '../util/httpHeaders';
import * as util from '../util/requestUrlUtil';

let path = '';
let base = '';
let cj = {};

function errorHandler(req, res, error) {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;
    cj.collection.error = {};
    cj.collection.error = error;

    res.status(401).set('WWW-Authenticate', 'OAuth').send(JSON.stringify(cj));
}

export { errorHandler };