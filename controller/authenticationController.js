const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const tM = require('../models/tokenManagement'); // Path to your tokenManagement model

/**
 * @swagger
 * tags:
 *   name: Authecation
 *   description: Authecation management API
 */
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: register a new user
 *     tags: [Authecation]
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
 *         description: Created
 */


router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const tokenMan = await tM.findOne({ email });

        if (tokenMan) {
            return res.status(400).json({ message: 'tokenManagement already exists' });
        }

       const newTm = new tokenManagement({ email, password });
        await newTm.save();

        const token = jwt.sign({ id: tokenManagement._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(201).json({ status: 'success', token });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Authecation]
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
        const tokenManagement = await tM.findOne({ email });

        if (!tokenManagement || !(await tokenManagement.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: tokenManagement._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ status: 'success', token });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
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
