const mongoose = require('mongoose');
const { encrypt, decrypt } = require('../utils/encryption');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    readBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

// Encrypt content before saving
messageSchema.pre('save', function(next) {
    if (this.isModified('content')) {
        this.content = encrypt(this.content);
    }
    next();
});

// Decrypt content when retrieving
messageSchema.methods.getDecryptedContent = function() {
    return decrypt(this.content);
};

// Virtual for decrypted content
messageSchema.virtual('decryptedContent').get(function() {
    return decrypt(this.content);
});

// Ensure virtuals are included when converting to JSON
messageSchema.set('toJSON', {
    virtuals: true,
    transform: function(doc, ret) {
        ret.content = decrypt(ret.content);
        return ret;
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message; 