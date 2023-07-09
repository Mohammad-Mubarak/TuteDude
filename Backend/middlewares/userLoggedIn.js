const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.JWT_SECRET
const User = require("../models/user")

exports.UserLoggedIn = async (req, res, next) => {
    const token = req.cookies.token
    // if token not found in cookies, check if header contains Auth field
    if (!token && req.header("Authorization")) {
        token = req.header("Authorization").replace("Bearer ", "")
    }
    if (!token) {
        return res.json({ message: "Login first to access this page" })
    }

    try {
        const decode = jwt.verify(token, SECRET_KEY)
        next()
    } catch (error) {
        res.send(error)
    }
};

