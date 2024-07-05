const express = require('express');
const { adddata, getdata, update, delet } = require('../controllers/data.controllers');
const auth = require('../midedlewares/auth');
const access = require('../midedlewares/access');


const dataRoutes = express.Router();

dataRoutes.post("/", auth, access("user"), adddata);


dataRoutes.get("/", auth, access("user", "admin"), getdata);

dataRoutes.put("/:id", auth, access("user,admin"), update);

dataRoutes.delete("/:id", auth, access("user"), delet);

module.exports = dataRoutes;