import url from 'url';
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

    res.writeHead(200, 'OK',
        {
            'Content-Type': cType,
            'Access-Control-Allow-Origin': '*'
        }
    );
    res.end(JSON.stringify(cj));
}

const monthlyCalendarHandler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl

    createMonthlyCalendarRepresentation();
    renderQueries();

    res.writeHead(200, 'OK',
        {
            'Content-Type': cType,
            'Access-Control-Allow-Origin': '*'
        }
    );
    res.end(JSON.stringify(cj));
}

const dailyCalendarHandler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl

    createDailyCalendarRepresentation();


    res.writeHead(200, 'OK',
        {
            'Content-Type': cType,
            'Access-Control-Allow-Origin': '*'
        }
    );
    res.end(JSON.stringify(cj));
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

// the basic template for all Cj responses
const createMonthlyCalendarRepresentation = () => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + "/calendar"});
    cj.collection.links.push({ 'rel': 'template', 'href': base + path + '/template'});

    cj.collection.items = [];
    cj.collection.queries = [];

    for (var i = 1; i <= 30; i++) {
        cj.collection.items.push({
            href: base + path + '/' + i,
            data: [
                {
                    name: "title",
                    value: "title" + i,
                    prompt: "title"
                },
                {
                    name: "startDate",
                    value: "2017-06-xx",
                    prompt: "start date"
                },
                {
                    name: "endDate",
                    value: "2017-06-xx",
                    prompt: "end date"
                }
            ]
        });
    }
}

// the basic template for all Cj responses
const createDailyCalendarRepresentation = () => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/calendar/schedule' });

    cj.collection.items = [];

    cj.collection.items.push({
        href: base + path,
        data: [
            {
                name: "title",
                value: "title" + 13,
                prompt: "title"
            },
            {
                name: "startDate",
                value: "2017-06-xx",
                prompt: "start date"
            },
            {
                name: "endDate",
                value: "2017-06-xx",
                prompt: "end date"
            }
        ]
    });
}

export { calendarHandler, monthlyCalendarHandler, dailyCalendarHandler };