const express = require("express");
const helmController = require("./../controllers/helmController");

const router = express.Router();

router.route("/").get(helmController.getReleases);
router.route("/:relseaseName/revisions").get(helmController.getRevisions);
router
  .route("/:relseaseName/revisions/:rev1/:rev2")
  .get(helmController.getDiff);

router
  .route("/:relseaseName/statusSummary")
  .get(helmController.getStatusSummary);

module.exports = router;
