const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

// Model
const Doctor = require("../models/doctor");

// Trae todos los hospitales desde la BD
const getDoctors = async (req, res) => {

  const doctors = await Doctor.find()
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');
  
    res.json({
      ok: true,
      doctors,
      uid_req: req.uid
    });
};

// Se crea un hospital en la BD
const createDoctor = async (req, res = response) => {
  
  const uid = req.uid;
  const doctor = new Doctor({
    user: uid,
    ...req.body
  });

  try {

    const doctorCreated = await doctor.save();

    res.json({
      ok: true,
      doctor: doctorCreated
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
const updateDoctor = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Hi from updateDoctor'
    })
}

// Borra un hospital de la BD
const deleteDoctor = async (req, res = response) => {
    const uid = req.params.id;
    
      try {
        const doctorDB = await Doctor.findById(uid);
    
        if (!doctorDB) {
          return res.status(404).json({
            ok: false,
            msg: "No existe un doctor con ese id",
          });
        }
    
        await Doctor.findByIdAndDelete( uid ); 
    
        res.json({
          ok: true,
          msg: 'Doctor deleted'
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          ok: false,
          msg: "Unexpected error... Contact to the administrator",
        });
      }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
  };