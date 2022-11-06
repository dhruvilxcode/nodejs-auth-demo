const {expressjwt} = require("express-jwt");

exports.isSignedIn = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"]
})

exports.isAuthenticated = (req, res, next) => {
    
    const checker = req.auth && req.auth.id

    if(!checker) {
        res.status(403).json({message: "access denied!"});
    }

    //TODO: comment below line in production
    console.log(req.auth);

    next()
}