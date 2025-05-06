const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here';
const IV_LENGTH = 16;

function encryptFile(inputPath) {
    return new Promise((resolve, reject) => {
        try {
            const iv = crypto.randomBytes(IV_LENGTH);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            
            const input = fs.createReadStream(inputPath);
            const outputPath = `${inputPath}.enc`;
            const output = fs.createWriteStream(outputPath);
            
            // Write IV at the beginning of the file
            output.write(iv);
            
            input.pipe(cipher).pipe(output);
            
            output.on('finish', () => {
                // Delete original file
                fs.unlinkSync(inputPath);
                resolve(outputPath);
            });
            
            output.on('error', (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
}

function decryptFile(inputPath) {
    return new Promise((resolve, reject) => {
        try {
            const input = fs.createReadStream(inputPath);
            const outputPath = inputPath.replace('.enc', '');
            const output = fs.createWriteStream(outputPath);
            
            // Read IV from the beginning of the file
            const iv = Buffer.alloc(IV_LENGTH);
            input.read(iv);
            
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            
            input.pipe(decipher).pipe(output);
            
            output.on('finish', () => {
                // Delete encrypted file
                fs.unlinkSync(inputPath);
                resolve(outputPath);
            });
            
            output.on('error', (err) => {
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    encryptFile,
    decryptFile
}; 