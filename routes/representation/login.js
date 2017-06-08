import url from 'url';
let path = '';
let base = '';
const cType = 'application/json'
let cj = {};

const loginHandler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = url.parse(req.url).pathname;

    createLoginRepresentation();

    res.writeHead(200, 'OK',
        {
            'Content-Type': cType,
            'Access-Control-Allow-Origin': '*'
        }
    );
    res.end(JSON.stringify(cj));
}

const loginTemplateHandler = (req, res) =>{
    base = 'http://' + req.headers.host;
    path = url.parse(req.url).pathname;

    createLoginTemplateRepresentation();
    renderTemplate();

    res.writeHead(200, 'OK',
        {
            'Content-Type': cType,
            'Access-Control-Allow-Origin': '*'
        }
    );
    res.end(JSON.stringify(cj));
}

// the basic template for all Cj responses
const createLoginRepresentation = () => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base });
    cj.collection.links.push({ 'rel': 'template', 'href': base + path + '/template' });
}

const createLoginTemplateRepresentation = () => {
    cj.collection = {};
    cj.collection.version = "1.0";
    cj.collection.href = base + path;

    cj.collection.links = [];
    cj.collection.links.push({ 'rel': 'up', 'href': base + '/login' });

}

// render write template (POST, PUT)
function renderTemplate() {
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
}

export { loginHandler, loginTemplateHandler };