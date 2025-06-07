const mongoose = require('mongoose');

const ExcelFileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
});

module.exports = mongoose.model('ExcelFile', ExcelFileSchema);


// changed