import { errorHandler } from './error';
import { headerSet } from '../util/httpHeaders';
import * as util from '../util/requestUrlUtil';

let path = '';
let base = '';
const cType = 'application/json'
let cj = {};
var friends = [];

const groupHandler = (req, res) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    let parentUrl = util.getParentUrl(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': parentUrl });
    cj.collection.links.push({ 'rel': 'template', 'href': href + '/template' });
    cj.collection.links.push({ 'rel': 'list', 'href': href + '/list' });

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const groupListHandler = (req, res, result) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    let parentUrl = util.getParentUrl(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': parentUrl });
    cj.collection.links.push({ 'rel': 'template', 'href': parentUrl + '/template' });

    cj.collection.items = [];

    result.map((element) => {
        cj.collection.items.push({
            href: base + '/group' + '/' + element.idx,
            data: [
                {
                    "name": "name",
                    "value": element.name,
                    "prompt": "group name"
                }
            ]
        });
    });

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const groupDetailHandler = (req, res, result) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    let parentUrl = util.getParentUrl(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': parentUrl });
    cj.collection.links.push({ 'rel': 'template', 'href': parentUrl + '/template' });

    cj.collection.items = [];

    result.map((element) => {
        cj.collection.items.push({
            href: base + '/group' + '/' + element.idx,
            data: [
                {
                    "name": "name",
                    "value": element.name,
                    "prompt": "group name"
                },
                {
                    "name": "created",
                    "value": element.created,
                    "prompt": "created date"
                },
                {
                    "name": "selected",
                    "value": element.selected ? true : false,
                    "prompt": "show selected"
                }
            ]
        });
    });

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const groupTemplateHandler = (req, res) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    let parentUrl = util.getParentUrl(req);
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': parentUrl });
    
    var template = {};
    var item = {};

    template.data = [];

    item = {};
    item.name = 'name';
    item.value = '';
    item.prompt = 'group name';
    template.data.push(item);

    item = {};
    item.name = 'selected';
    item.value = true;
    item.prompt = 'show selected';
    template.data.push(item);

    cj.collection.template = template;

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}


const createGroupFromTemplate = (template) => {
    let group = {};
    let data = template.template.data;

    data.map((element, index) => {
        group[element.name] = element.value;
    });

    return group;
}

export {
    groupHandler,
    groupListHandler,
    groupDetailHandler,
    groupTemplateHandler,
    createGroupFromTemplate
};