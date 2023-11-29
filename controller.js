'use strict';

const response = require('./res');
const db = require('./conn');
const md5 = require('md5');
const crypto = require('crypto');
const cookie = require('cookie');
const axios = require('axios');

exports.home = (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const query = "SELECT * FROM users WHERE users.user_token = ?";

    db.all(query, [cookies.session_id], (error, response) => {
       if (!error) {
           if (response.length > 0) {
               res.sendFile(__dirname + '/public/home.html');
           } else {
               res.status(403).redirect("/login?error=Unauthorized");
           }
       }  else {
           res.status(500).redirect("/login?error=" + error.message);
       }
    });
};

exports.login = (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
};

exports.session = (req, res) => {
    res.sendFile(__dirname + '/public/session.html');
};

exports.doLogin = (req, res) => {
    const {email, password} = req.body;
    const host = req.protocol + '://' + req.get('host');

    axios.post(host + '/api/v1/login', {
        user_email: email,
        user_password: password
    })
        .then(function(response) {
            res.setHeader('Set-Cookie', cookie.serialize('session_id', response.data.values.session_id, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 0.5 // 1 week
            }));
            res.redirect('/home');
        })
        .catch(function(e) {
            if (e.response.status === 401) {
                res.redirect("/login?error=Invalid username or password");
            } else {
                res.redirect("/login?error=" + e.message);
            }

            console.log(e);
        });

};