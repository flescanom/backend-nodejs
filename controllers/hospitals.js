const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

// Model
const Hospital = require("../models/hospital");

// Trae todos los hospitales desde la BD
const getHospitals = async (req, res) => {

  const hospitals = await Hospital.find()
                                .populate('user', 'name img');

  res.json({
    ok: true,
    hospitals,
    uid_req: req.uid,
  });
};

// Se crea un hospital en la BD
const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });

  try {
    const hospitalCreated = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalCreated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error... Contact to the administrator",
    });
  }
};

// Actualiza un hospital de la BD
const updateHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "update hospital",
  });
};

// Borra un hospital de la BD
const deleteHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msg: "delete hospital",
  });
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
