const jwt = require('jsonwebtoken')
const config = require('config')
const secretKey = config.get('secretKey')

module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    console.log("token: " + token);
    if (token == null) return res.status(401).json({ msg: "No Authorizie token sent" })

    try {
        const decoded = jwt.verify(token, secretKey)
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(400).json({ msg: "Invalid Token sent" })
    }
}