const transectionModel = require("../models/transectionModel");
const moment = require("moment");

const getAllTransections = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json({
      success: true,
      transections,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const addTransection = async (req, res) => {
  try {
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).json({
      success: true,
      newTransection,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const editTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndUpdate(
      { _id: req.body.transectionID },
      req.body.payload
    );
    res.status(200).send("Edit successfully");
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

const deleteTransection = async (req, res) => {
  try {
    await transectionModel.findOneAndDelete({ _id: req.body.transectionID });
    res.status(200).send("Transection Deleted");
  } catch (error) {
    res.status.json({
      success: false,
      error,
    });
  }
};

module.exports = {
  getAllTransections,
  addTransection,
  editTransection,
  deleteTransection,
};
