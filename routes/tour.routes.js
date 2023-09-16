const express = require("express");

const {
  getAllTours,
  createNewTour,
  getTourById,
  updateTour,
  deleteTour,
} = require("../controllers/tour.controller");

const router = express.Router();

router.route("/").get(getAllTours).post(createNewTour);
router.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
