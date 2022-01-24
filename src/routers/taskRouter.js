const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

//READ TASKS
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

//READ TASK BY ID
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send();
  }
});

//UPDATE TASK
router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const updatedKeys = Object.keys(req.body);
  console.log(updatedKeys);
  const allowedUpdates = ["description", "completed"];
  const isValidUpdate = updatedKeys.every((updatedKey) => {
    return allowedUpdates.includes(updatedKey);
  });
  console.log(isValidUpdate);

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid update!" });
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

//CREATE TASKS
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(200).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

//DELETE TASK
router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
