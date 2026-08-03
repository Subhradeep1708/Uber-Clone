const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken.model");


module.exports.isUserAuthenticated = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }


    // check if the token is blacklisted
    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        
        return next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
