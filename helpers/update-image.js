const fs = require("fs");

const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");
const { json } = require("stream/consumers");

const modelCollections = {
  users: User,
  hospitals: Hospital,
  doctors: Doctor,
};

// Se borra la imagen anterior si existe una
const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const updateImage = async (collection, id, fileName) => {
  if (modelCollections.hasOwnProperty(collection)) {
    const model = await modelCollections[collection].findById(id);

    if (!model) {
      console.log("model not valid");
      return false;
    }

    const oldPath = `./uploads/${collection}/${model.img}`;
    deleteImage(oldPath);

    model.img = fileName;
    await model.save();
    return true;
  }
};

module.exports = {
  updateImage,
};
