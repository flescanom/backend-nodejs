const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const { ObjectId } = require("mongoose").Types;

const User = require("../models/user");

const uploadFile = async (req, res = response) => {
  try {
    const { collection, id } = req.params;

    if(!ObjectId.isValid(id)) {
        return res.status(400).json({
            ok: false,
            msg: "The id is not valid",
        });
    }

    // Usando el middleware de express-fileupload - el nombre del key en el form-data es "image"
    const { image } = req.files;

    // Validando la coleccion
    const validCollections = ["users", "hospitals", "doctors"];
    if (!validCollections.includes(collection)) {
      return res.status(400).json({
        ok: false,
        msg: "The collection does not exist",
      });
    }

    // Validando que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "There is no file to upload",
      });
    }

    const shortName = image.name.split(".");
    const extensionFile = shortName[shortName.length - 1];

    // Validando la extension del archivo
    const validExtensions = ["png", "jpg", "jpeg", "gif"];
    if (!validExtensions.includes(extensionFile)) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid file type",
      });
    }

    const fileName = `${uuidv4()}.${extensionFile}`;
    const uploadPath = `uploads/${collection}/${fileName}`;

    // Grabando el archivo en el servidor
    image.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          msg: "Error uploading file",
        });
      }

      // Aquí puedes guardar la ruta del archivo en la base de datos o hacer lo que necesites con el archivo
      // Por ejemplo, si estás subiendo una imagen de un usuario, puedes guardar la ruta en la base de datos
      // const user = await User.findById(id);
      updateImage(collection, id, fileName);

      // Archivo subido correctamente
      res.json({
        ok: true,
        msg: "File uploaded successfully",
        fileName,
      });
    });
  } catch (error) {
    console.error('Error', error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error... Contact to the administrator",
    });
  }
};

const getImage = (req, res = response) => {

  const { collection, image } = req.params;
  const pathImg = path.join(__dirname, `../uploads/${collection}/${image}`);


  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no_image.jpg`);
    res.sendFile(pathImg);
  }

}

module.exports = {
  uploadFile,
  getImage
};
