const express = require('express');
const FamiliesController = require("./families");
const SpeciesController = require("./species");
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/families/', FamiliesController.getFamilies);
router.get('/families/:id', FamiliesController.getFamily);
router.get('/species/', SpeciesController.getPlants);
router.get('/species/:id', SpeciesController.getPlant);
module.exports = router;