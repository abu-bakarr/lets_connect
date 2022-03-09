const jwt = require('jsonwebtoken')
const config = require('config')
const secretKey = config.get('secretKey')

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token')
    console.log("Toeken ==>", req.header);
    if (!token) {
        res.status(401).json({ msg: "No Authorizie token sent" })
    }
    try {
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(400).json({ msg: "Invalid Token sent" })
    }
}