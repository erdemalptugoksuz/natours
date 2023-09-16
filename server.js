const application = require("./app");

const port = 3000;
application.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
