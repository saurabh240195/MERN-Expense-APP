const express = require("express");
const {
  addTransection,
  getAllTransections,
  editTransection,
  deleteTransection,
} = require("../controllers/transectionController");

//  router object

const router = express.Router();

// router

// add transection
router.post("/add-transection", addTransection);

// edit transection
router.post("/edit-transection", editTransection);

// delete transection
router.post("/delete-transection", deleteTransection);

// get transection
router.post("/get-transections", getAllTransections);

module.exports = router;
