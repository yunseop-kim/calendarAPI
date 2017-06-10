const url = require('url');

function getBaseUrlOfRequest(req) {
	var url = req.protocol + '://' + req.get('host');
	return url.replace(/\/$/, '');
}

function getRequestUrl(req) {
	var url = req.protocol + "://" + req.get('host') + req.originalUrl;
	return url.replace(/\/$/, '');
}

function getParentUrlOfRequest(req, howManyDepth) {
	var originalUrl = getRequestUrl(req);
	howManyDepth = howManyDepth || 1;

	var p = url.parse(originalUrl);
	delete p.hash;
	delete p.query;
	delete p.search;

	var path = p.pathname.split('/');
	for (var i=0; i < howManyDepth; i++) {
		path.pop();
	}
	p.pathname = path.join('/');
	
	return url.format(p);
}

function getUrlByAppendPathToRequest(req, pathToAppend, keepQuery, keepHash) {
	var originalUrl = getRequestUrl(req);
	keepQuery = keepQuery || false;
	keepHash = keepHash || false;

	var p = url.parse(originalUrl, true);
	if (!keepHash) {
		delete p.hash;
	}

	if (!keepQuery) {
		delete p.query;
		delete p.search;
	}

	var path = p.pathname.split('/');
	if (pathToAppend) {
		path.push(pathToAppend);
	}
	p.pathname = path.join('/');
	
	return url.format(p);
}

function getUrlByAppendQueryToRequest(req, params) {
	if (!req || !params) {
		return;
	}

	var p = url.parse(req, true);
	delete p.search;

	for (var key in params) {
		if (!params.hasOwnProperty(key)) {
			continue;
		}

		if (params[key]!=0  && !params[key]) {
			continue;
		}
		
		p.query[key] = params[key];
	}

	return url.format(p);
}

function hasInvalidDateFormatInQuery(queries) {
	if (!queries) {
		return false;
	}

	for (var key in queries) {
		var q = queries[key];
		if (!q) {
			continue;
		}

		var d = new Date(q);
		if (Object.prototype.toString.call(d)!=='[object Date]') {
			return true;
		}

		if (isNaN(d.getTime())) {
			return true;
		}
	}
	return false;
}


module.exports = {
	getBaseUrl : getBaseUrlOfRequest,
	getRequestUrl : getRequestUrl,
	getParentUrl : getParentUrlOfRequest,
	getUrlByAppendPath : getUrlByAppendPathToRequest,
	getUrlByAppendQuery : getUrlByAppendQueryToRequest,
	hasInvalidDateQuery : hasInvalidDateFormatInQuery
};

// todo : calendar api rules...