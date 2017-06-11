import { headerSet } from '../util/httpHeaders';
import * as util from '../util/requestUrlUtil';

let path = '';
let base = '';
const cType = 'application/json'
let cj = {};

const loginHandler = (req, res) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base });
    cj.collection.links.push({ 'rel': 'template', 'href': base + path + '/template' });

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const loginTemplateHandler = (req, res) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/login' });

    var template = {};
    var item = {};

    template.data = [];

    item = {};
    item.name = 'email';
    item.value = '';
    item.prompt = 'Email';
    template.data.push(item);

    item = {};
    item.name = 'password';
    item.value = '';
    item.prompt = 'Password';
    template.data.push(item);

    cj.collection.template = template;

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}


const createLoginFromTemplate = (template) => {
    let login = {};
    let data = template.template.data;

    data.map((value, index) => {
        login[value.name] = value.value;
    });

    return login;
}

export { loginHandler, loginTemplateHandler, createLoginFromTemplate };