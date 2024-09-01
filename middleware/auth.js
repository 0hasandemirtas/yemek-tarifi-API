const jwt = require('jsonwebtoken');

const userAuth = async(req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if (auth) {
            const token = auth.replace("Bearer ", "");
            req.user = await jwt.verify(token, "jwtPrivateKey");
        } ;
        
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = userAuth;