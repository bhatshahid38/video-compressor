const express = require("express")
const app = express()
const ytRouter = require("./routes/downloadYoutube")
const CProuter = require("./routes/CompressVideo")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/downloadYoutubeVideo",ytRouter)
app.use("/compressVideo",CProuter)

module.exports = app