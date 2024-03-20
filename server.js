const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")
// const bodyParser = require("body-parser")
const express = require("express")
const postRouter = require("./backend/router/formRouter")
const app = express()
const PORT = process.env.PORT || 5001


app.use(express.json())
app.use(cors())
// app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", postRouter)

app.get("/", (req,res) => {
    res.status(200).json({message: "Works!"})
})


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
