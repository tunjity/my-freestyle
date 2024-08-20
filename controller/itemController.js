const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Item management API
 */
/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json({
      status: 'success',
      message: 'Items retrieved successfully',
      data: items
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve items',
      data: null
    });
  }
});

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/items', async (req, res) => {
  const { name, quantity } = req.body;
  const newItem = new Item({ name, quantity });
  try {
    const savedItem = await newItem.save();
    res.status(201).json({
      status: 'success',
      message: 'Item created successfully',
      data: savedItem
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create item',
      data: null
    });
  }
});

module.exports = router;
