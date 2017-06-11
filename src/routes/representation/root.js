import { headerSet } from '../util/httpHeaders';
import * as util from '../util/requestUrlUtil';

let path = '';
let base = '';
const cType = 'application/json'
let cj = {};

const handler = (req, res) => {
    base = util.getBaseUrl(req)

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'home', 'href': base });
    cj.collection.links.push({ 'rel': 'login', 'href': base + '/login' });
    cj.collection.links.push({ 'rel': 'calendar', 'href': base + '/calendar' });
    cj.collection.links.push({ 'rel': 'group', 'href': base + '/group' });

    res.writeHead(200, 'OK', headerSet);
    res.end(JSON.stringify(cj));
}

export { handler };