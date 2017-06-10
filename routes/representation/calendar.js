import { errorHandler } from './error';

let path = '';
let base = '';
const cType = 'application/json'
let cj = {};
var friends = [];

const calendarHandler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl

    createCalendarRepresentation();
    // renderQueries();

    res.status(200).set(
        {
            'Content-Type': cType,
            'Access-Control-Allow-Origin': '*'
        }
    ).send(JSON.stringify(cj));
}

const calendarTemplateHandler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl;
    createCalendarTemplateRepresentation();
    renderTemplate();

    res.status(200).set(
        {
            'Content-Type': cType,
            'Access-Control-Allow-Origin': '*'
        }
    ).send(JSON.stringify(cj));
}

const createCalendarTemplateRepresentation = () => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/calendar' });

}

// render write template (POST, PUT)
function renderTemplate() {
    var template = {};
    var item = {};

    template.data = [];

    item = {};
    item.name = 'title';
    item.value = '';
    item.prompt = 'Title';
    template.data.push(item);

    item = {};
    item.name = 'start_date';
    item.value = '';
    item.prompt = 'Start Date';
    template.data.push(item);

    item = {};
    item.name = 'end_date';
    item.value = '';
    item.prompt = 'End Date';
    template.data.push(item);

    cj.collection.template = template;
}

const monthlyCalendarHandler = (req, res, year, month) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl
    var lastDay = new Date(year, month, 0).getDate();

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + "/calendar" });
    // cj.collection.links.push({ 'rel': 'prev', 'href': base + "/calendar" });
    // cj.collection.links.push({ 'rel': 'next', 'href': base + "/calendar" });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/calendar/template' });

    cj.collection.items = [];

    for (let i = 1; i <= lastDay; i++) {
        if ( i < 10){
            i = '0' + i;
        }

        cj.collection.items.push({
            href: base + '/' + year + '/' + month + '/' + i + '/schedule'
        });
    }

    res.status(200).set({
        'Content-Type': cType,
        'Access-Control-Allow-Origin': '*'
    }).send(JSON.stringify(cj));
}

const dailyCalendarHandler = (req, res, result) => {
    let { year, month } = req.params;
    base = 'http://' + req.headers.host;
    path = req.originalUrl

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/' + year +'/' + month + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/calendar/template' });
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

    res.status(200).set({
        'Content-Type': cType,
        'Access-Control-Allow-Origin': '*'
    }).send(JSON.stringify(cj));
}

const calendarDetailHandler = (req, res, result) => {
    let { year, month, day, idx } = req.params;
    base = 'http://' + req.headers.host;
    path = req.originalUrl

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/' + year +'/' + month + '/' + day + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/calendar/template' });
    // cj.collection.links.push({ 'rel': 'prev', 'href': base + '/' + year +'/' + month + '/' + day + '/schedule' });
    // cj.collection.links.push({ 'rel': 'next', 'href': base + '/' + year +'/' + month + '/' + day + '/schedule' });

    cj.collection.items = [];


    result.map(element => {
        cj.collection.items.push({
            href: base + path,
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

    res.status(200).set({
        'Content-Type': cType,
        'Access-Control-Allow-Origin': '*'
    }).send(JSON.stringify(cj));
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
const createCalendarRepresentation = () => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base });
    cj.collection.links.push({ 'rel': 'schedule', 'href': base + path + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': base + path + '/template' });

    // cj.collection.queries = [];
}

const createCalendarFromTemplate = (template) => {
    let calendar = {};
    let data = template.template.data;

    data.map((element, index) => {
        calendar[element.name] = element.value;
    });

    return calendar;
}

export {
    calendarHandler,
    calendarTemplateHandler,
    monthlyCalendarHandler,
    dailyCalendarHandler,
    calendarDetailHandler,
    createCalendarFromTemplate
};