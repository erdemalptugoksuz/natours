const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (request, response) => {
  response.status(200).json({
    status: "success",
    requestedAt: request.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};
const createNewTour = (request, response) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, request.body);
  tours.push(newTour);

  fs.writeFile(
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (error) => {
      response.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const getTourById = (request, response) => {
  const id = request.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return response.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  response.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};
const updateTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  response.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};
const deleteTour = (request, response) => {
  if (request.params.id * 1 > tours.length) {
    return response.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  response.status(204).json({
    status: "success",
    data: null,
  });
};

module.exports = {
  getAllTours,
  createNewTour,
  getTourById,
  updateTour,
  deleteTour,
};
