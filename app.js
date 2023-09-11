import express from "express";

const application = express();
const port = 3000;

application.get("/", (request, response) => {
  response
    .status(200)
    .json({ message: "Hello from the server side!", app: "Natours" });
});

application.post("/", (request, response) => {
  response.send("You can post to this endpoint...");
});

application.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
