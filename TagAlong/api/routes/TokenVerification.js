const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.header("x-auth-token");
    if (!token){
        return res.json({ error: "Token is required for authentication" } );
    }
    else{
        console.log("token verification");
        try{
            var decoded = jwt.verify(token, 'secretkey');
            console.log(decoded);
            return next(decoded.user_id);
        } catch(err){
            return res.json(err);
        }
    }

}

module.exports = verifyToken;