const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { sendMessage, allMessages, downloadFile } = require('../controllers/messageController');

router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, allMessages);
router.route('/download/:fileUrl').get(protect, downloadFile);

module.exports = router; 