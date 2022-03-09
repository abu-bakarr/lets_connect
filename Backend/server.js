const express = require('express')
const app = express()
const connectDb = require('./config/dbConnect')
var cors = require('cors');

app.use(cors());
connectDb()
    //Middleware
app.use(express.json({ extended: false }))

app.use("/api/users", require('./routes/api/users'))
app.use("/api/profile", require('./routes/api/profile'))
app.use("/api/posts", require('./routes/api/posts'))
app.use("/api/auth", require('./routes/api/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Connected to Port  ${PORT}`))