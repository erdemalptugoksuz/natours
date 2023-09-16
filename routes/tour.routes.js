const express = require("express");

const {
  checkId,
  checkBody,
  getAllTours,
  createNewTour,
  getTourById,
  updateTour,
  deleteTour,
} = require("../controllers/tour.controller");

const router = express.Router();

router.param("id", checkId);

router.route("/").get(getAllTours).post(checkBody, createNewTour);
router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
