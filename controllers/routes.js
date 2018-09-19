const {uploadSingle} = require('../db');

const express = require('express');
const router = express.Router();
//const multipart = require('connect-multiparty');
//const multipartMiddleware = multipart();

const FamiliesController = require("./families");
const SpeciesController = require("./species");
const UploadsController = require("./uploads");

router.get('/families', FamiliesController.getFamilies);
router.get('/families/:id', FamiliesController.getFamily);

router.get('/species', SpeciesController.getSpecies);
router.get('/species/:id', SpeciesController.getSpecimen);
router.post('/species', SpeciesController.createSpecimen);
router.put('/species/:id', SpeciesController.updateSpecimen);
router.delete('/species/:id', SpeciesController.removeSpecimen);

router.get('/uploads', UploadsController.getFiles);
router.get('/uploads/:id', UploadsController.getFile);
//router.put('/uploads/:id', UploadsController.updateFile);
router.post('/uploads', uploadSingle('file'), UploadsController.uploadFile);
router.delete('/uploads/:id', UploadsController.removeFile);

router.get('/photos/:id', UploadsController.renderFile('image'));
router.get('/audio/:id', UploadsController.renderFile('audio'));

module.exports = router;