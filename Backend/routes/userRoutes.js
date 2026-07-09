const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', protect, userController.getUserProfile);
router.put('/:id', protect, userController.updateUserProfile);

module.exports = router;
