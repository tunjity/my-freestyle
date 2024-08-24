const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               users:
 *                 type: object
 */
router.get('/users', async (req, res) => {
  try {
    const items = await User.find({ isDeleted: false });
    res.json({
      status: 'success',
      message: 'Items retrieved successfully',
      data: items
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve users',
      data: null
    });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               age:
 *                 type: number
 *               state:
 *                 type: number
 *               country:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/users', async (req, res) => {
  const { fullname, age,state,country } = req.body;
  const createdBy = req.user.id;
  const newItem = new User({ fullname, age,state,country,createdBy });
  try {
    const savedItem = await newItem.save();
    res.status(201).json({
      status: 'success',
      data: savedItem
    });
  } catch (err) {
    const errorCos = err.errors;
    res.status(500).json({
      status: 'error',
      message: `Failed to create User${errorCos}`,
      data: null
    });
  }
});
/**
 * @swagger
 * /api/users/delete{id}:
 *   delete:
 *     summary: Delete a user Completely
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/delete:id', async (req, res) => {
    try {
      const item = await User.findByIdAndDelete(req.params.id);
      if (item) {
        res.json({
          status: 'success',
          message: 'User deleted successfully',
          data: item
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'User not found',
          data: null
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete item',
        data: null
      });
    }
  });
  
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user SOFTLY
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        user.isDeleted = true;
        user.deletedBy = req.user.id;
        await user.save();
        res.json({
          status: 'success',
          message: 'User marked as deleted',
          data: user
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'User not found',
          data: null
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to mark user as deleted',
        data: null
      });
    }
  });
  
  
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: get a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found successfully
 *       404:
 *         description: User not found
 */
router.get('/users/:id', async (req, res) => {
    try {
      const item = await User.findById(req.params.id);
      if (item) {
        if(!item.isDeleted){
        res.json({
          status: 'success',
          message: 'User found successfully',
          data: item
        });}
        else{
            res.status(404).json({
                status: 'error',
                message: 'User is already soft deleted',
                data: null
              })
        }
      } else {
        res.status(404).json({
          status: 'error',
          message: 'User not found',
          data: null
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to get item',
        data: null
      });
    }
  });
 
 /**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: update a user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             fullname:
 *               type: string
 *             age:
 *               type: number
 *             state:
 *               type: number
 *             country:
 *               type: number
 *     responses:
 *       200:
 *         description: User found successfully
 *       404:
 *         description: User not found
 */
  router.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id, isDeleted: false });
      if (user) {
        // Update user fields here
        user.fullname = req.body.fullname || user.fullname;
        user.age = req.body.age || user.age;
        user.state = req.body.state || user.state;
        user.country = req.body.country || user.country;
        user.createdBy = req.body.createdBy || user.createdBy;
        user.modifiedBy = req.user.id;
        await user.save();
        res.json({
          status: 'success',
          message: 'User updated successfully',
          data: user
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'User not found or deleted',
          data: null
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to update user',
        data: null
      });
    }
  });
  
module.exports = router;
