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
    cj.collection.links.push({ 'rel': 'schedule', 'href': href + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': href + '/template' });

    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const calendarScheduleHandler = (req, res, date) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    let parentUrl = util.getParentUrl(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': parentUrl });
    cj.collection.links.push({ 'rel': 'prev', 'href': util.getMonthlyCalendarUrl(base, date, 'prev') + '/schedule' });
    cj.collection.links.push({ 'rel': 'current', 'href': util.getMonthlyCalendarUrl(base, date) + '/schedule' });
    cj.collection.links.push({ 'rel': 'next', 'href': util.getMonthlyCalendarUrl(base, date, 'next') + '/schedule' });

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

    query = {};
    query.rel = 'find by query';
    query.prompt = 'find by query';
    query.href = href + '/find';
    query.data = [];
    query.data[0] = {
        'name': 'query',
        'value': '',
        'prompt': 'input query.'
    }

    cj.collection.queries.push(query);
    res.status(200).set(headerSet).send(JSON.stringify(cj));
}

const calendarTemplateHandler = (req, res) => {
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
    let parentUrl = util.getParentUrl(req, 3);
    var lastDay = new Date(year, month, 0).getDate();

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': parentUrl + "/schedule" });
    cj.collection.links.push({ 'rel': 'today', 'href': util.getDailyCalendarUrl(base) + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': parentUrl + '/template' });

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
    let { year, month, day } = req.params;
    let date = year + '-' + month + '-' + day;
    
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    let parentUrl = util.getParentUrl(req, 4);
    console.log('parentUrl:', parentUrl);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': util.getMonthlyCalendarUrl(base, date) + '/schedule' });
    cj.collection.links.push({ 'rel': 'template', 'href': parentUrl + '/template' });

    cj.collection.items = [];


    result.map(element => {
        cj.collection.items.push({
            href: parentUrl + '/schedule' + '/' + element.idx,
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

const findCalendarHandler = (req, res, result) => {
    base = util.getBaseUrl(req)
    let href = util.getUrlByAppendPath(req);
    let parentUrl = util.getParentUrl(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': parentUrl });
    cj.collection.links.push({ 'rel': 'template', 'href': base + '/calendar' + '/template' });

    cj.collection.items = [];


    result.map(element => {
        cj.collection.items.push({
            href: parentUrl + '/' + element.idx,
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
    let parentUrl = util.getParentUrl(req);

    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = href;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': parentUrl });

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
    findCalendarHandler,
    calendarDetailHandler,
    createCalendarFromTemplate
};