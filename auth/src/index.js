const express = require("express")
const {port, host} = require("./configuration")
const {connectDB} = require("./helpers/db.js")
const {User} = require("./models/user")

const app = express()


app.get("/users", async (req, res) => {
    const user = new User({name: "Peter", age: 40})
    await user.save()
    res.json({user})
})

app.get("/api/user", async (req, res) => {
    const user = new User({name: "Peter", age: 40})
    res.json({user})
})

function startServer() {
    app.listen(port, () => {
        console.log(`Server is listening on ${port}`)
        console.log(`Host is ${host}`)
    })
}

connectDB()
    .on('error', console.error.bind(console, 'connection error:'))
    .once("open", startServer)