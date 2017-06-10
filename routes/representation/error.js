import { headerSet } from '../util/httpHeaders';

let path = '';
let base = '';
let cj = {};

function errorHandler(req, res, error) {
    base = 'http://' + req.headers.host;
    path = req.originalUrl;

    createErrorRepresentation(error);

    res.status(401).set('WWW-Authenticate', 'OAuth').send(JSON.stringify(cj));
}


function createErrorRepresentation(error) {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;
    cj.collection.error = {};
    cj.collection.error = error;
}

export { errorHandler };