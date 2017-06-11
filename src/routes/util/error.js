let error = function (code, title, message) {
	return {
		code: code,
		title: title,
		message: message
	};
}

let mySqlError = (message) => {
	return {
		code: '1001',
		title: 'SQL error',
		message: message
	};
}

const CATEGORY = {
	UNKNOWN: 'Unknown',
	SQL: 'SQL Error',
	CLIENT_INPUT: 'Client Input Error',
	SERVER_PROCESSING: 'Server Processing Error',
	SECURITY: 'Security Error',
}

const ERROR = {
	UNKNOWN: error('1000', CATEGORY.UNKNOWN, 'Unknown error occurred'),
	SQL: error('1001', CATEGORY.SQL, 'SQL query has some error. See Logs'),
	REQUIRED_FIELD_MISSING: error('2000', CATEGORY.CLIENT_INPUT, 'Required field is missing'),
	INVALID_INPUT: error('2001', CATEGORY.CLIENT_INPUT, 'Some input value is not valid'),
	RESOURCE_CONFLICT: error('2002', CATEGORY.CLIENT_INPUT, 'The resource you want to create is already exist'),
	EMPTY_VALUE: error('2003', CATEGORY.CLIENT_INPUT, 'Input is empty'),
	CAN_NOT_FIND_ACCOUNT: error('2004', CATEGORY.CLIENT_INPUT, 'Can not find a account'),

	CAN_NOT_CREATE_RESOURCE: error('3001', CATEGORY.SERVER_PROCESSING, 'Can not create a resource you requested'),
	RESOURCE_NOT_FOUND: error('3002', CATEGORY.SERVER_PROCESSING, 'The resource you want requested is not found'),

	AUTHENTICATION_REQUIRED: error('4000', CATEGORY.SECURITY, 'Authentication required')
};


export { ERROR, mySqlError }