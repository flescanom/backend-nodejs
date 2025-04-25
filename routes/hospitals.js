/*
    Ruta: /api/hospitals
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals");

const router = Router();

// Obtener todos los hospitales
router.get("/", validateJWT, getHospitals);

// Crear un nuevo hospital
router.post("/",
  [
    validateJWT,
    check("name", "The hospital name is required").not().isEmpty(),
    validateFields
  ],
  createHospital
);

// Actualizar un hospital
router.put("/:id",
  [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    check("role", "The role is required").not().isEmpty(),
    validateFields,
  ],
  updateHospital
);

// Borrar un hospital
router.delete("/:id", validateJWT, deleteHospital);

module.exports = router;
