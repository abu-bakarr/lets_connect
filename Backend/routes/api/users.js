const express = require('express')
const router = express()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const config = require('config')
const secretKey = config.get('secretKey')
const UserModel = require('../../models/Users')

//@route  => Public
//@Users  => Users route
//  /api/users
router.post("/", [
    check('name', "Name should not be empty").not().isEmpty(),
    check("email", "Please enter valid Email").isEmail(),
    check('password', "Password should contain 8 or more characters").isLength({ min: 8 })
], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({ user: errors.array() })
    }
    const { name, email, password } = req.body

    try {
        let user = await UserModel.findOne({ email })
        if (user) {
            res.json({ error: "User already exists" })
            return
        }

        let avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: 'mm'
        })

        user = new UserModel({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()
        const payload = {
            user: {
                id: user.id
            }
        }
        jsonwebtoken.sign(payload, secretKey, {
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