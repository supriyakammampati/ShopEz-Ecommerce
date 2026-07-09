const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/login', adminController.login);
router.get('/data', protect, isAdmin, adminController.getAdminData);
router.put('/categories', protect, isAdmin, adminController.updateCategories);
router.put('/banner', protect, isAdmin, adminController.updateBanner);

module.exports = router;
