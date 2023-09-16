const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tour.routes");
const userRouter = require("./routes/user.routes");

const application = express();
if (process.env.NODE_ENV === "development") {
  application.use(morgan("dev"));
}

application.use(express.json());
application.use(express.static(`${__dirname}/public`));

application.use((request, response, next) => {
  console.log("Hello from the middleware 👋");
  next();
});
application.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next();
});

application.use("/api/v1/tours", tourRouter);
application.use("/api/v1/users", userRouter);

module.exports = application;
