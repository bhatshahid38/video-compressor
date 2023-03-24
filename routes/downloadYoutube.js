const express = require("express");
const router = express.Router();
const{youtube} = require("../controllers/youtubeController")
router.get("/",youtube)

module.exports = router;