const express = require("express");
//const cron = require("node-cron");

const BasicRoute = require("./Routes/basicRoute.js");

const PORT = 3001;
const app = express();

app.use("/api/job", BasicRoute);

app.listen(PORT, () => {
  console.log(`SuccessFully Connected To ${PORT}`);
});
