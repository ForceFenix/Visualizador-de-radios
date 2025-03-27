const express = require('express');
const router = express.Router();
const { uploadPDFs, getPDFMetadata } = require('../controllers/fileController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.array('pdfs'), uploadPDFs);
router.get('/metadata', getPDFMetadata);

module.exports = router;