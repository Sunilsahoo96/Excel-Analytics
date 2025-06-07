const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Stats Endpoints
router.get('/stats/users', adminController.getTotalUsers);
router.get('/stats/all-users',adminController.getAllUsers);
router.get('/stats/uploads', adminController.getTotalUploads);
router.get('/stats/downloads', adminController.getTotalDownloads);
router.get('/users/:id',adminController.getUserById);
router.delete('/users/:id',adminController.deleteUserById);

module.exports = router;
