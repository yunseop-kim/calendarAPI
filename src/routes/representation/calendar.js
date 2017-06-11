import { errorHandler } from './error';
import { headerSet } from '../util/httpHeaders';
import * as util from '../util/requestUrlUtil';

let path = '';
let base = '';
const cType = 'application/json'
let cj = {};
var friends = [];

const calendarHandler = (req, res) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base });
    cj.collection.links.push({ 'rel': 'schedule', 'href': base + path + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': base + path + '/template' });

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const calendarScheduleHandler = (req, res, date) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base });
    cj.collection.links.push({ 'rel': 'prev', 'href': util.getCalendarUrl(base, date, 'prev') + '/schedule' });
    cj.collection.links.push({ 'rel': 'current', 'href': util.getCalendarUrl(base, date) + '/schedule' });
    cj.collection.links.push({ 'rel': 'next', 'href': util.getCalendarUrl(base, date, 'next') + '/schedule' });

    cj.collection.queries = [];

    var query = {};
    query.rel = 'find by date';
    query.prompt = 'find by date';
    query.href = href;
    query.data = [];
    query.data[0] = {
        'name': 'date',
        'value': '',
        'prompt': 'input date. format: YYYY-MM'
    }

    cj.collection.queries.push(query);
    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const calendarTemplateHandler = (req, res) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/calendar' });

    var template = {};
    var item = {};

    template.data = [];

    item = {};
    item.name = 'title';
    item.value = '';
    item.prompt = 'Title';
    template.data.push(item);

    item = {};
    item.name = 'startDate';
    item.value = '';
    item.prompt = 'Start Date';
    template.data.push(item);

    item = {};
    item.name = 'endDate';
    item.value = '';
    item.prompt = 'End Date';
    template.data.push(item);

    item = {};
    item.name = 'groupName';
    item.value = '';
    item.prompt = 'select group name';
    template.data.push(item);

    cj.collection.template = template;

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const monthlyCalendarHandler = (req, res, year, month) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    var lastDay = new Date(year, month, 0).getDate();

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + "/calendar" });
    cj.collection.links.push({ 'rel': 'today', 'href': util.getDailyCalendarUrl(base) + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/calendar/template' });

    cj.collection.items = [];

    for (let i = 1; i <= lastDay; i++) {
        if (i < 10) {
            i = '0' + i;
        }

        cj.collection.items.push({
            href: base + '/calendar' + '/' + year + '/' + month + '/' + i + '/schedule'
        });
    }

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const dailyCalendarHandler = (req, res, result) => {
    let { year, month } = req.params;
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/' + year + '/' + month + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/calendar/template' });
    // cj.collection.links.push({ 'rel': 'prev', 'href': base + '/' + year +'/' + month + '/schedule' });
    // cj.collection.links.push({ 'rel': 'next', 'href': base + '/' + year +'/' + month + '/schedule' });

    cj.collection.items = [];


    result.map(element => {
        cj.collection.items.push({
            href: base + '/calendar' + '/schedule' + '/' + element.idx,
            data: [
                {
                    name: "title",
                    value: element.title,
                    prompt: "title"
                }
            ]
        });
    });

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const calendarDetailHandler = (req, res, result) => {
    let { year, month, day, idx } = req.params;
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/calendar' });
    // cj.collection.links.push({ 'rel': 'prev', 'href': base + '/' + year +'/' + month + '/' + day + '/schedule' });
    // cj.collection.links.push({ 'rel': 'next', 'href': base + '/' + year +'/' + month + '/' + day + '/schedule' });

    cj.collection.items = [];


    result.map(element => {
        cj.collection.items.push({
            href: href,
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
                },
                {
                    name: "groupName",
                    value: '',
                    prompt: "group name"
                }
            ]
        });
    });

    res.status(200).set(headerSet).send(JSON.stringify(cj));
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
    calendarScheduleHandler,
    calendarTemplateHandler,
    monthlyCalendarHandler,
    dailyCalendarHandler,
    calendarDetailHandler,
    createCalendarFromTemplate
};