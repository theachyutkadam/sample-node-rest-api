// // src/routes/user.js

// const crypto = require('crypto');
// const algorithm = 'aes-256-cbc'; //Using AES encryption
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

// const express = require('express');
// // const router = express.Router();
// // const User = require('../models/user');

// //Encrypting text
// function encrypt(text) {
//   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
// }

// // Decrypting text
// function decrypt(text) {
//   let iv = Buffer.from(text.iv, 'hex');
//   let encryptedText = Buffer.from(text.encryptedData, 'hex');
//   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }

// Login user
// router.post('/login', async (req, res) => {
//   try {
//     console.log('Check--payload->', req.body);
//     const user = await User.find(req.body.email);
//     console.log('Check--response->', user);
//     res.json("546s4df6s4df6s5d4f6s54df6s5d4f654");
//   } catch (error) {
//     // res.status(500).json({ message: 'Failed to create user.' });
//     res.status(500).json({ message: error.message });
//   }
// });

// Text send to encrypt function
// var hw = encrypt("Welcome to Tutorials Point")
// console.log(hw.encryptedData)
// console.log(decrypt(hw))

// module.exports = router;


const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Check-authHeader-->', authHeader);
  if (!authHeader) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
  // const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(authHeader, 'SECRET');
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
};