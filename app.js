import express from "express";
import fs from "fs";

const application = express();
application.use(express.json());
const port = 3000;
const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

// application.get("/", (response) => {
//   response
//     .status(200)
//     .json({ message: "Hello from the server side!", app: "Natours" });
// });

// application.post("/", (response) => {
//   response.send("You can post to this endpoint...");
// });

application.get("/api/v1/tours", (request, response) => {
  response.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

application.post("/api/v1/tours", (request, response) => {
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
});

application.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
