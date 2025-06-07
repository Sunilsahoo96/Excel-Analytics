const User = require('../models/User');
const File = require('../models/ExcelFile');
const mongoose = require("mongoose");

const getTotalUsers = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ totalUsers: count });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users count' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email'); 
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user details' });
  }
};

const getTotalUploads = async (req, res) => {
  try {
    const count = await File.countDocuments();
    res.json({ totalUploads: count });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching uploads count' });
  }
};

const getTotalDownloads = async (req, res) => {
  try {
    const result = await File.aggregate([
      { $group: { _id: null, downloads: { $sum: "$downloadCount" } } }
    ]);
    const downloads = result[0]?.downloads || 0;
    res.json({ totalDownloads: downloads });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching downloads count' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, 'name email');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const files = await File.find({ user: new mongoose.Types.ObjectId(req.params.id) });

    res.json({ user, files });
  } catch (err) {
    console.error('Error in getUserById:', err.message);
    res.status(500).json({ error: 'Error fetching user by ID' });
  }
};



const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};


module.exports = {
  getTotalUsers,
  getTotalUploads,
  getTotalDownloads,
  getAllUsers,
  getUserById,
  deleteUserById
};
