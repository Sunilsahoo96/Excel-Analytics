const ExcelFile = require('../models/ExcelFile');
const xlsx = require('xlsx');

const uploadExcel = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user.id;

    if (!file) return res.status(400).json({ message: 'No file uploaded.' });

    const newFile = new ExcelFile({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      user: userId
    });

    await newFile.save();
    console.log("Incoming file:", file);

    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    res.status(200).json({
      message: 'File uploaded and saved successfully',
      data: newFile,
      parsedData: sheetData
    });
  } catch (err) {
    res.status(500).json({ message: 'Error uploading file', error: err.message });
  }
};

const getUploadedExcelData = async (req, res) => {
  try {
    const userId = req.user.id;
    const uploadedFiles = await ExcelFile.find({ user: userId }).sort({ uploadedAt: -1 });

    res.status(200).json({ files: uploadedFiles }); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching uploaded files', error: err.message });
  }
};

const getAllUploadHistory = async (req, res) => {
  try {
    const files = await ExcelFile.find()
      .sort({ uploadedAt: -1 }) // Optional: show latest uploads first
      .populate('user', 'name email'); // 👈 Only include name & email of the user

    res.json({ files });
  } catch (err) {
    console.error('Error in getAllUploadHistory:', err.message);
    res.status(500).json({ message: 'Failed to fetch all upload history' });
  }
};



const deleteUploadHistory = async (req, res) => {
  try {
    const result = await ExcelFile.deleteMany({ user: req.user.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No history found for this user.' });
    }

    res.status(200).json({ message: 'Upload history cleared successfully.' });
  } catch (err) {
    console.error('Error deleting history:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getFileDataById = async (req, res) => {
  try {
    const file = await ExcelFile.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.SheetNames[0];
    const parsedData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);

    res.json({ parsedData });
  } catch (err) {
    res.status(500).json({ message: 'Error reading Excel file', error: err.message });
  }
};


module.exports = {
  uploadExcel,
  getUploadedExcelData,
  getAllUploadHistory,
  deleteUploadHistory,
  getFileDataById
};


// changed