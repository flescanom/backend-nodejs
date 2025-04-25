const { response } = require("express");

const User = require("../models/user");
const Hospital = require("../models/hospital");
const Doctor = require("../models/doctor");
const hospital = require("../models/hospital");

const getAll = async (req, res = response) => {
  const search = req.params.search;
  const regex = new RegExp(search, "i"); // 'i' for case insensitive

  const [users, hospitals, doctors] = await Promise.all([
    User.find({ name: regex }),
    Hospital.find({ name: regex }),
    Doctor.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    users,
    hospitals,
    doctors,
  });
};

const getDocumentsByCollection = async (req, res = response) => {
  const collection = req.params.table;
  const search = req.params.search;
  const regex = new RegExp(search, "i"); // 'i' for case insensitive

  let data = [];

  switch (collection) {
    case "users":
      data = await User.find({ name: regex });
      break;
    case "hospitals":
      data = await Hospital.find({ name: regex }).populate("user", "name img");
      break;
    case "doctors":
      data = await Doctor.find({ name: regex })
        .populate("user", "name img")
        .populate("hospital", "name img");
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "The collection does not exist",
      });
  }

  res.json({
    ok: true,
    results: data,
  });
};

module.exports = {
  getAll,
  getDocumentsByCollection
};
