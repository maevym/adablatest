'use strict';

exports.ok = function(values, res) {
    const data = {
        'status': 200,
        'values': values
    };
    res.status(200).json(data);
    res.end();
};

exports.unauthorized = function(message, res) {
    const data = {
        'status': 401,
        'message': message
    };
    res.status(401).json(data);
    res.end();
};

exports.forbidden = function(message, res) {
    const data = {
        'status': 403,
        'message': message
    };
    res.status(403).json(data);
    res.end();
};

exports.serverError = function(message, res) {
    const data = {
        'status': 500,
        'message': message
    };
    res.status(500).json(data);
    res.end();
};

exports.notFound = (message, res) => {
    const data = {
        'status': 404,
        'message': message
    };
    res.status(404).json(data);
    res.end();
};