import url from 'url';
import { headerSet } from '../util/httpHeaders';

let path = '';
let base = '';
const cType = 'application/json'
let cj = {};

const handler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = url.parse(req.url).pathname;

    createCjTemplate();

    res.writeHead(200, 'OK', headerSet);
    res.end(JSON.stringify(cj));
}

// the basic template for all Cj responses
const createCjTemplate = () => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'home', 'href': base });
    cj.collection.links.push({ 'rel': 'login', 'href': base + '/login' });
    cj.collection.links.push({ 'rel': 'calendar', 'href': base + '/calendar' });
    cj.collection.links.push({ 'rel': 'group', 'href': base + '/group' });
}

export { handler };