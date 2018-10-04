const {uploadSingle} = require('../db');
const MimeTypes = require('../constants/mimeTypes');

const express = require('express');
const router = express.Router();

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
router.get('/uploads/:id/image', UploadsController.renderFile(MimeTypes.IMAGE));
router.get('/uploads/:id/audio', UploadsController.renderFile(MimeTypes.AUDIO));
router.put('/uploads/:id', UploadsController.updateMetadata);
router.post('/uploads', uploadSingle('file'), UploadsController.uploadFile);
router.delete('/uploads/:id', UploadsController.removeFile);

module.exports = router;