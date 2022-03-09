const express = require('express')
const router = express()
const config = require('config')
const auth = require('../../middleware/auth')
const postModel = require('../../models/Posts')
const userModel = require('../../models/Users')
const { check, validationResult } = require('express-validator')

//@route  => Private
//@Users  => Add a Post route
router.post("/", [auth, [
    check('text', "Text must be included").not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ msg: errors.array() })
        return
    }
    try {

        const user = await userModel.findById(req.user.id).select('-password')
        console.log("User is ", user)
        const newPost = new postModel({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save()

        res.json(post)
        return
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
        return
    }

})

//@route  => Private
//@Users  => Get all Post route
router.get("/", auth, async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ msg: errors.array() })
        return
    }
    try {
        const post = await postModel.find().sort({ date: -1 })
        res.json(post)
        return
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
        return
    }

})

//@route  => Private
//@Users  => Get One Post route
router.get("/:id", auth, async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ msg: errors.array() })
        return
    }
    try {

        const post = await postModel.findById(req.params.id)
        res.json(post)

        return
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: "Post not found" })
        }
        console.log(err.message)
        res.status(500).send("Server error")
        process.exit(1)
        return
    }

})

//@route  => Private
//@Users  => Delet User Post route
router.delete("/:id", auth, async(req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() })
        }
        try {
            const post = await postModel.findById(req.params.id)
            if (!post) {
                res.status(401).json({ msg: "Post not found" })
                return
            }

            if (post.user.toString() !== req.user.id) {
                return res.status(404).json({ msg: "Post Not found" })
            }

            await post.remove()
            res.json(post)
            return
        } catch (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: "Post not found" })

            }
            console.log(err.message)
            res.status(500).send("Server error")
            process.exit(1)
            return
        }
    })
    //@route  => Private
    //@Users  => Like a Post User Post route
    //@desc api/likes:id
router.put('/likes/:id', auth, async(req, res) => {
        try {
            const post = await postModel.findById(req.params.id)

            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.json({ msg: "Post already liked" })
            }
            post.likes.unshift({ user: req.user.id })
            await post.save()

            res.json(post.likes)
            return
        } catch (err) {
            res.status(500).send("Server Error")
            return
        }
    })
    //@route  => Private
    //@Users  => Unliked a Post User Post route
    //@desc api/unlike:id
router.put('/unlike/:id', auth, async(req, res) => {
        try {
            const post = await postModel.findById(req.params.id)

            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                res.json({ msg: "Cannot Unliked Post" })
                return
            }
            //Get the correct like to remove
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
            post.likes.splice(removeIndex, 1)
            console.log(post.likes)
            await post.save()

            res.json(post.likes)
            return

        } catch (err) {
            res.status(500).send("Server Error")
            return
        }
    })
    //@route  => Private
    //@Users  => Add Comment route
    //@desc api/posts/comment/id
router.post("/comment/:id", [auth, [
        check('text', "Text must be included").not().isEmpty()
    ]], async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({ msg: errors.array() })
            return
        }
        try {

            const user = await userModel.findById(req.user.id).select('-password')
            const post = await postModel.findById(req.params.id)

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }
            post.comments.unshift(newComment)
            await post.save()

            res.json(post)
            return
        } catch (err) {
            console.log(err.message)
            res.status(500).send("Server error")
            return
        }
    })
    //@route  => Private
    //@Users  => Delete Comment route
    //@desc api/posts/comment/:id/:comment_id
router.delete("/comment/:id/:comment_id", auth, async(req, res) => {
    try {
        const post = await postModel.findById(req.params.id)

        // Pull Comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)
            //Check if comment exist
        if (!comment) {
            res.status(404).json({ msg: "No comment Avalable" })
            return
        }
        // check if it the user that post the comment
        if (comment.user.toString() !== req.user.id) {
            res.status(401).json({ msg: "Comment can only be deleted by the user that post it" })
            return
        }
        //Get the correct comment to remove
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex, 1)
        console.log(post.comments)
        await post.save()

        res.json(post.comments)
        return
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server error")
        return
    }
})

module.exports = router