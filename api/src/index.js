const express = require("express")
const {port, host, authApiUrl} = require("./configuration")
const {connectDB} = require("./helpers/db.js")
const {Task} = require("./models/task")
const axios = require("axios")

const app = express()


app.get("/tasks", async (req, res) => {
    const task = new Task({title: "Task01", description: "Description of Task01"})
    await task.save()
    const tasks = await Task.find()
    res.json({tasks})
})

app.get("/user", async (req, res) => {
    axios.get(authApiUrl + "/user").then((response) => {
        res.json({
            service: "api",
            user: response.data
        })
    })
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