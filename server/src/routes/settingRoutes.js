const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingController");

router.get("/", getSettings);

router.post(
  "/update",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 },
  ]),
  updateSettings
);

module.exports = router;