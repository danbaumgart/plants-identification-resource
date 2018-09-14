const express = require('express');
const router = express.Router();

const FamiliesController = require("./families");
const SpeciesController = require("./species");

router.get('/families', FamiliesController.getFamilies);
router.get('/families/:id', FamiliesController.getFamily);
router.get('/species', SpeciesController.getPlants);
router.get('/species/:id', SpeciesController.getPlant);
module.exports = router;