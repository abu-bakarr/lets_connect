const mongoose = require('mongoose')
const config = require('config')
const localDb = "mongodb://localhost/merncourse"

const remote = "mongodb+srv://abubakarr:alxproject@2022@alx-project.h2xtm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


const connectDb = async() => {
    try {
        await mongoose.connect(remote, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log(`Connected to MongoDB Remotely`)
    } catch (err) {
        console.log(err.message)

        process.exit(1)
    }
}
module.exports = connectDb