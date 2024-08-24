const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tokenManagement = require('../models/tokenManagement'); // Import the model

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication management API
 */
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */

router.post('/register', async (req, res) => {
    try {
        const { email, password,username } = req.body;
        
        // Check if a user with this email already exists
        const existingUser = await tokenManagement.findOne({ $or: [
            { email: email },
            { username: username }
          ]});
        if (existingUser) {
            return res.status(400).json({  status: 'error', message: 'User already exists' });
        }

        // Create a new user
        const newTm = new tokenManagement({ email, password,username });
        await newTm.save();

        // Generate JWT token
        const token = jwt.sign({ id: newTm._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({
            status: 'success',
            message: 'user added successfully',
            data: token
          });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});


/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Authentication]
 *     summary: login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login Successfully
 */

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await tokenManagement.findOne({ email });

        if (!existingUser || !(await existingUser.comparePassword(password))) {
            return  res.status(400).json({
                status: 'error',
                message: 'c',
                data: null
              });
        }

        const token = jwt.sign({ id: existingUser._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({
            status: 'success',
            message: `Welcome ${existingUser.username}`,
            data: token
          });
        } catch (err) {
          res.status(500).json({
            status: 'error',
            message: 'An error occured',
            data: null
          });
        }
    //     res.status(200).json({ status: 'success', token });
    // } catch (error) {
    //     res.status(500).json({ status: 'error', message: error.message });
    // }
});

// Protected route example
router.get('/protected', (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        res.status(200).json({ status: 'success', data: decoded });
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
});

module.exports = router;
