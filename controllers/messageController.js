const Message = require('../models/Message');
const Chat = require('../models/Chat');
const User = require('../models/User');
const { encrypt, decrypt } = require('../utils/encryption');
const { encryptFile, decryptFile } = require('../utils/fileEncryption');
const path = require('path');
const fs = require('fs');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { content, chatId, messageType, fileUrl } = req.body;

        if (!chatId) {
            return res.status(400).json({ message: 'Invalid data passed into request' });
        }

        let newMessage = {
            sender: req.user._id,
            chat: chatId,
            messageType: messageType || 'text'
        };

        // Handle file upload
        if (messageType === 'file' && fileUrl) {
            const filePath = path.join(__dirname, '..', fileUrl);
            const encryptedFilePath = await encryptFile(filePath);
            newMessage.fileUrl = encryptedFilePath.replace(path.join(__dirname, '..'), '');
        } else if (content) {
            newMessage.content = content; // Will be encrypted by the pre-save hook
        }

        let message = await Message.create(newMessage);

        message = await message.populate('sender', 'name pic');
        message = await message.populate('chat');
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email',
        });

        res.json(message);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all messages for a chat
exports.allMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate('sender', 'name pic email')
            .populate('chat');

        res.json(messages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Download file
exports.downloadFile = async (req, res) => {
    try {
        const { fileUrl } = req.params;
        const filePath = path.join(__dirname, '..', fileUrl);
        
        // Decrypt the file
        const decryptedFilePath = await decryptFile(filePath);
        
        // Send the decrypted file
        res.download(decryptedFilePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ message: 'Error downloading file' });
            }
            // Clean up the decrypted file after sending
            fs.unlink(decryptedFilePath, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting decrypted file:', unlinkErr);
            });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 