import { errorHandler } from './error';
import { headerSet } from '../util/httpHeaders';

let path = '';
let base = '';
const cType = 'application/json'
let cj = {};
var friends = [];

const groupHandler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl

    createGroupRepresentation();
    // renderQueries();

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const groupListHandler = (req, res, result) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl

    createGroupListRepresentation(result);
    // renderQueries();

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const groupDetailHandler = (req, res, result) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl

    createGroupDetailRepresentation(result);
    // renderQueries();

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const groupTemplateHandler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl;
    createGroupTemplateRepresentation();
    renderTemplate();

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const createGroupTemplateRepresentation = () => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/group' });

}

// render write template (POST, PUT)
function renderTemplate() {
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
}

const monthlyGroupHandler = (req, res, year, month) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl
    var lastDay = new Date(year, month, 0).getDate();

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + "/group" });
    // cj.collection.links.push({ 'rel': 'prev', 'href': base + "/group" });
    // cj.collection.links.push({ 'rel': 'next', 'href': base + "/group" });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/group/template' });

    cj.collection.items = [];

    for (let i = 1; i <= lastDay; i++) {
        if (i < 10) {
            i = '0' + i;
        }

        cj.collection.items.push({
            href: base + '/' + year + '/' + month + '/' + i + '/schedule'
        });
    }

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const dailyGroupHandler = (req, res, result) => {
    let { year, month } = req.params;
    base = 'http://' + req.headers.host;
    path = req.originalUrl

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/' + year + '/' + month + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/group/template' });
    // cj.collection.links.push({ 'rel': 'prev', 'href': base + '/' + year +'/' + month + '/schedule' });
    // cj.collection.links.push({ 'rel': 'next', 'href': base + '/' + year +'/' + month + '/schedule' });

    cj.collection.items = [];


    result.map(element => {
        cj.collection.items.push({
            href: base + path + '/' + element.idx,
            data: [
                {
                    name: "title",
                    value: element.title,
                    prompt: "title"
                },
                {
                    name: "startDate",
                    value: element.start_date,
                    prompt: "start date"
                },
                {
                    name: "endDate",
                    value: element.end_date,
                    prompt: "end date"
                }
            ]
        });
    });

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

// render supported queries as valid Cj query elements
function renderQueries() {
    var query = {};

    query = {};
    query.rel = 'find by date';
    query.prompt = 'find by date';
    query.href = base + path;
    query.data = [];
    query.data[0] = {
        'name': 'date',
        'value': '',
        'prompt': 'date'
    }
    cj.collection.queries.push(query);
}

// the basic template for all Cj responses
const createGroupRepresentation = () => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base });
    cj.collection.links.push({ 'rel': 'template', 'href': base + path + '/template' });
    cj.collection.links.push({ 'rel': 'list', 'href': base + path + '/list' });

    // cj.collection.queries = [];
}

const createGroupListRepresentation = (result) => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/group' });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/template' });

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
    })

}

const createGroupDetailRepresentation = (result) => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/group' });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/group' + '/template' });

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
    monthlyGroupHandler,
    dailyGroupHandler,
    createGroupFromTemplate
};