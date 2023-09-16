const dotenv = require("dotenv");

const application = require("./app");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3000;
application.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
