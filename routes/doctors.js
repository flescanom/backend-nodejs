/*
    Ruta: /api/doctors
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctors");

const router = Router();

// Obtener todos los doctores
router.get("/", validateJWT, getDoctors);

// Crear un nuevo doctor
router.post(
  "/",
  [
    validateJWT,
    check("name", "The doctor name is required").not().isEmpty(),
    check("hospital", "The hospital ID must be valid").isMongoId(),
    validateFields
  ],
  createDoctor
);

// Actualizar un doctor
router.put(
  "/",
  [
    validateJWT,
    validateFields
  ],
  updateDoctor
);

// Borrar un doctor
router.delete('/:id', validateJWT, deleteDoctor);

module.exports = router;
