const express = require("express")

const router = express.Router()

const apiController = require("../controllers/apiController")

router.get("/me", apiController.me)//

router.get("/stock", apiController.stock)//

module.exports = router