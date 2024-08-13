const jwt = require('jsonwebtoken');

const auth = async(req, res, next) => {
    try {
        const auth = req.headers("Authorization");
        if (auth) {
            const token = auth.replace("Bearer ", "");
            user = await jwt.verify(token, "jwtPrivateKey");
        } ;
        
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = auth;