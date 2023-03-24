const express = require("express")
const router = express.Router()
const{compressfile} =require("../controllers/compressController")
router.get("/",compressfile)

module.exports=router