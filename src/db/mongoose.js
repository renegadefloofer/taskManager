const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/task-manager-api")
  .then(() => {
    console.log("Success connecting");
  })
  .catch((err) => {
    console.log("connect failed:" + err);
  });
