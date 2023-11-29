const response = require('../res');
const db = require('../conn');
const cookie = require('cookie');

module.exports = function checkAdminToken(req,res,next){
    const auth = req.get("authorization");
    const userToken = (auth == null) ? cookie.parse(req.headers.cookie || '').session_id : auth.split(" ").pop();
    const query = "SELECT user_id FROM USERS WHERE user_token = ? AND user_group = ?";
    db.all(query, [userToken,3], (error, rows) => {
       if (rows.length === 1) {
           next();
       } else {
           response.unauthorized("Unauthorized", res);
       }
    });
};
