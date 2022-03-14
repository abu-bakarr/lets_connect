const express = require('express')
const router = express()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const profileModel = require('../../models/Profile')
const userModel = require('../../models/Users')
const postModel = require('../../models/Posts')
const requests = require('request')
const config = require('config')
const githubClientID = config.get('githubClient_ID')
const githubClientSecret = config.get('githubClient_Secret')

// test calling user

//@access  => Private
//@Users  => Profile route
// api/profile/me => Get 
router.get("/me", auth, async(req, res) => {

    console.log("User hereNow =>", req.user.id)
    try {
        const profile = await userModel.findOne({ _id: req.user.id }).populate('user', ['name', 'avatar'])
        console.log("Profile here =>", profile)


        if (!profile) {

            return res.json({ msg: "User Profile not found" })
        }
        res.json(profile)
        return

    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
    return
})

//@access  => Private
//@Users  => Profile Post route
// api/users/profile => Post 
router.post("/", [auth, [
    check('status', "Status is Required").not().isEmpty(),
    check('skills', "Skills is Required").not().isEmpty()
]], async(req, res) => {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({ msg: error.array() })
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        instagram,
        twitter,
        linkedin
    } = req.body

    var profileObject = {}
    profileObject.user = req.user.id
    if (company) profileObject.company = company
    if (website) profileObject.website = website
    if (location) profileObject.location = location
    if (bio) profileObject.bio = bio
    if (status) profileObject.status = status
    if (githubusername) profileObject.githubusername = githubusername
    if (skills) {
        profileObject.skills = skills.split(',').map(skill => skill.trim())
    }
    profileObject.social = {}
    if (youtube) profileObject.social.youtube = youtube
    if (facebook) profileObject.social.facebook = facebook
    if (instagram) profileObject.social.instagram = instagram
    if (twitter) profileObject.social.twitter = twitter
    if (linkedin) profileObject.social.linkedin = linkedin

    try {
        let profile = await profileModel.findOne({ user: req.user.id })
        if (profile) {
            profile = await profileModel.findOneAndUpdate({ user: req.user.id }, { $set: profileObject }, { new: true })
            res.json(profile)
            return
        }

        profile = new profileModel(profileObject)
        await profile.save()
        res.json(profile)
        return
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }

})

//@access  => Public
//@Users  => Get Profile route
// api/profile => Get All
router.get("/", async(req, res) => {

    try {
        let profiles = await profileModel.find().populate('user', ['name', 'avatar', 'email'])
        res.json(profiles)

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
    return
})

//@access  => Public
//@Users  => Get Profile route
// api/profile/user/<id> => Get One 
router.get("/user/:user_id", async(req, res) => {

    try {
        let profile = await profileModel.findOne({ user: req.params.user_id }).populate({ path: 'user', select: ['name', 'avatar'] })
        if (!profile) res.status(400).json({ msg: "No profile for this user" })

        console.log(profile)
        res.json(profile)
        return
    } catch (err) {
        if (err.kind == "ObjectId") {
            return res.status(400).json({ msg: "No profile for this user" })
        }
        res.status(500).send("Server Error")
        return
    }

})

//@access  => private
//@Users  => Get Profile route
// api/profile => Delete User
router.delete("/", auth, async(req, res) => {
    try {
        await postModel.deleteMany({ user: req.user.id })
        await profileModel.findOneAndRemove({ user: req.user.id })
        await userModel.findOneAndRemove({ _id: req.user.id })

        res.json({ msg: "User Profile deleted" })
        return
    } catch (err) {
        console.error(err.message)
        res.send("Server Error")
        return
    }

})

//@access                        => Private
//@Users                         => Post Experience Profile route
// api/profile/experience  => Add Experience Post 
router.put("/experience", [auth, [
    check('title', 'Title is Required').not().isEmpty(),
    check('company', 'Company is Required').not().isEmpty(),
    check('from', 'From Date is Required').not().isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req)


    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        let profile = await profileModel.findOne({ user: req.user.id })
        profile.experience.unshift(newExperience)
        console.log(req.user.id)
        await profile.save()
        res.json(profile)

    } catch (err) {
        console.error(err.message)
    }
    return
})

//@access                        => Private
//@Users                         => Delete Experience Profile route
// api/profile/experience  => Delete Experience Post 
router.delete("/experience/:ex_id", auth, async(req, res) => {

    try {
        let profile = await profileModel.findOne({ user: req.user.id })
        let removeIndex = profile.experience.map(item => item.id).indexOf(req.params.ex_id)
        profile.experience.splice(removeIndex, 1)
        await profile.save()
        res.json({ msg: "delete success" })
        return
    } catch (err) {
        console.error(err.message)
        return
    }

})

//@access                        => Private
//@Users                         => Post Education Profile route
// api/profile/experience  => Add Education Post 
router.put("/education", [auth, [
    check('school', 'school is Required').not().isEmpty(),
    check('degree', 'degree is Required').not().isEmpty(),
    check('fieldofstudy', 'fieldofstudy Date is Required').not().isEmpty(),
]], async(req, res, next) => {

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body

    const myEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        let profile = await profileModel.findOne({ user: req.user.id })
        profile.education.unshift(myEducation)
        console.log(req.user.id)
        await profile.save()
        res.json(profile)
        return
    } catch (err) {
        console.error(err.message)
    }
    return
})

//@access                        => Private
//@Users                         => Delete Education Profile route
// api/profile/experience  => Delete Education Post 
router.delete("/education/:edu_id", auth, async(req, res, next) => {

    try {
        let profile = await profileModel.findOne({ user: req.user.id })
        let removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex, 1)
        await profile.save()
        res.json({ msg: "delete success" })
        return
    } catch (err) {
        console.error(err.message)
    }
    next()
})

//@access                        => Public
//@Users                         =>  Github  Profile route
// api/profile/experience  => Get Github Users Repos
router.get('/github/:username', (req, res) => {
    try {
        let options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${githubClientID}&client_secret=${githubClientSecret}`,
            method: 'GET',
            headers: { 'user-agent': 'nodejs' }
        }

        requests(options, (error, response, body) => {
            if (error) { return console.error(error.message) }

            if (response.statusCode === 404) {
                return res.json({ msg: "Account cannot found" })
            }
            res.json(JSON.parse(body))

        })
        return
    } catch (err) {
        return res.send("server Error...")
    }

})

module.exports = router