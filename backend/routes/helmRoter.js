const express = require("express");
const helmController = require("./../controllers/helmController");

const router = express.Router();

router.route("/").get(helmController.getReleases);
router.route("/:relseaseName/revisions").get(helmController.getRevisions);
// router.route("/:relseaseName/revisions").get(helmController.getRevisions);

module.exports = router;
