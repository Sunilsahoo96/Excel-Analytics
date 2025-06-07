const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadExcel, getUploadedExcelData,getAllUploadHistory, deleteUploadHistory, getFileDataById } = require('../controllers/excelController');
const protect = require('../middlewares/authMiddleware'); 

// Storage config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const name = path.parse(file.originalname).name
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase();
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${name}${ext}`);
  }
});

const upload = multer({ storage });

// ✅ Protected routes
router.post('/upload', protect, upload.single('excelFile'), uploadExcel);
router.get('/history', protect, getUploadedExcelData); 
router.delete('/history', protect, deleteUploadHistory);
router.get('/all-history', protect, getAllUploadHistory);
router.get('/file/:id',protect, getFileDataById)

module.exports = router;


//changed