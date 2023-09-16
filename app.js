import express from "express";
import fs from "fs";
import morgan from "morgan";

const application = express();
application.use(morgan("dev"));
application.use(express.json());
application.use((request, response, next) => {
  console.log("Hello from the middleware 👋");
  next();
});
application.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

const port = 3000;
const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

// Tours
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

// Users
const getAllUsers = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
const createNewUser = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
const getUserById = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
const updateUser = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
const deleteUser = (request, response) => {
  response.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createNewTour);
tourRouter.route("/:id").get(getTourById).patch(updateTour).delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createNewUser);
userRouter.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

application.use("/api/v1/tours", tourRouter);
application.use("/api/v1/users", userRouter);

application.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
