const express = require('express')
const router = express()
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')
const secretKey = config.get('secretKey')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const userModel = require('../../models/Users')

//@route  => Public
//@Users  => Users route
router.get("/", auth, async(req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password')
        res.json(user)

    } catch (err) {
        res.status(500).send("Server error...")
    }
})

router.post("/", [
    check("email", "Please enter valid Email").isEmail(),
    check('password', "Password is required").exists()
], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ user: errors.array() })
    }
    const { email, password } = req.body

    try {
        let user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: [{ message: "Invalid Credentials" }] })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: [{ message: "Incorrect Password" }] })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, secretKey, {
            expiresIn: "10d"
        }, (err, token) => {
            if (err) {
                throw err
            } else {
                res.json({ token })
            }
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
        process.exit(1)
    }
})

module.exports = router