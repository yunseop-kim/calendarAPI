let path = '';
let base = '';
const cType = 'application/json'
let cj = {};

const loginHandler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl;

    createLoginRepresentation();

    res.status(200).set(
        {
            'Content-Type': cType,
            'Access-Control-Allow-Origin': '*'
        }
    ).send(JSON.stringify(cj));
}

const loginTemplateHandler = (req, res) => {
    base = 'http://' + req.headers.host;
    path = req.originalUrl;
    createLoginTemplateRepresentation();
    renderTemplate();

    res.status(200).set(
        {
            'Content-Type': cType,
            'Access-Control-Allow-Origin': '*'
        }
    ).send(JSON.stringify(cj));
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

const createLoginFromTemplate = (template) => {
    let login = {};
    let data = template.template.data;

    data.map((value, index) => {
        login[value.name] = value.value;
    });

    return login;
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

export { loginHandler, loginTemplateHandler, createLoginFromTemplate };