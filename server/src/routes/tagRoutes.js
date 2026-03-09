const express = require("express");

const router = express.Router();

const tagController = require("../controllers/tagController");


router.get("/tags", tagController.getTags);

router.post("/tags", tagController.createTag);

router.put("/tags/:id", tagController.updateTag);

router.delete("/tags/:id", tagController.deleteTag);

router.patch("/tags/:id/toggle", tagController.toggleTag);


module.exports = router;