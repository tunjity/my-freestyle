const express = require('express');
const router = express.Router();
const State = require('../models/State');
const Country = require('../models/Country');

/**
 * @swagger
 * tags:
 *   name: States
 *   description: State management API
 */
/**
 * @swagger
 * /api/States:
 *   get:
 *     summary: Get all States
 *     tags: [States]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               States:
 *                 type: object
 */
router.get('/States', async (req, res) => {
  try {
    const States = await State.find();
    const caller = req.user.id;
    res.json({
      status: 'success',
      message: `States retrieved successfully by ${caller}`,
      data: States
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve States',
      data: null
    });
  }
});
/**
 * @swagger
 * /api/States/{countryId}:
 *   get:
 *     summary: get states by countryId
 
 *     parameters:
 *       - in: path
 *         name: countryId
 *         required: true
 *         schema:
 *           type: string
 *         description: countryId
 *     responses:
 *       200:
 *         description: States found successfully
 *       404:
 *         description: States not found
 */
router.get('/States/:countryId', async (req, res) => {
    try {
        console.log(req.params.countryId);
      const item = await State.find({countryId : req.params.countryId});
      if (item) {
        res.json({
          status: 'success',
          message: 'States found successfully',
          data: item
        });
      } else {
        res.status(404).json({
          status: 'error',
          message: 'States not found',
          data: null
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to get State',
        data: null
      });
    }
  });
 
/**
 * @swagger
 * /api/States:
 *   post:
 *     summary: Create a new State
 *     tags: [States]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               CountryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/States', async (req, res) => {
  const { name, countryId } = req.body;
  const newState = new State({ name, countryId });
  try {
    const savedState = await newState.save();
    res.status(201).json({
      status: 'success',
      message: 'State created successfully',
      data: savedState
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create State',
      data: null
    });
  }
});



/**
 * @swagger
 * tags:
 *   name: Countrys
 *   description: Country management API
 */
/**
 * @swagger
 * /api/Countrys:
 *   get:
 *     summary: Get all Countrys
 *     tags: [Countrys]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               Countrys:
 *                 type: object
 */
router.get('/Countrys', async (req, res) => {
  try {
    const Countrys = await Country.find().sort({ _id: -1 });
    res.json({
      status: 'success',
      message: 'Countrys retrieved successfully',
      data: Countrys
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve Countrys',
      data: null
    });
  }
});

/**
 * @swagger
 * /api/Countrys:
 *   post:
 *     summary: Create a new Country
 *     tags: [Countrys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/Countrys', async (req, res) => {
  const { name } = req.body;
  const newCountry = new Country({ name });
  try {
    const savedCountry = await newCountry.save();
    res.status(201).json({
      status: 'success',
      message: 'Country created successfully',
      data: savedCountry
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to create Country',
      data: null
    });
  }
});

/**
 * @swagger
 * /api/Countrys/{id}:
 *   get:
 *     summary: Get a specific country by ID
 *     tags: 
 *       - Countrys
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the country to retrieve
 *     responses:
 *       200:
 *         description: Country found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *       404:
 *         description: Country not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Country not found"
 */

router.get('/Countrys/:id', async (req, res) => {
  try {
    
    const item = await Country.findById(req.params.id);
    if (item) {
      
      res.json({
        status: 'success',
        message: 'Country found successfully',
        data: item
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Country not found',
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
* /api/Countrys/{id}:
*   put:
*     summary: Update a country
*     tags: [Countrys]
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: string
*         description: Country ID
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*     responses:
*       200:
*         description: Country updated successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 status:
*                   type: string
*                 message:
*                   type: string
*                 data:
*                   $ref: '#/components/schemas/Country'
*       404:
*         description: Country not found
*       500:
*         description: Failed to update country
* components:
*   schemas:
*     Country:
*       type: object
*       properties:
*         _id:
*           type: string
*         name:
*           type: string
*         otherField:
*           type: string
*/

router.put('/Countrys/:id', async (req, res) => {
  try {
    const user = await Country.findOne({ _id: req.params.id});
    if (user) {
      // Update user fields here
      console.log(req.body);
      user.name = req.body.name;
      await user.save();
      res.json({
        status: 'success',
        message: 'Country updated successfully',
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
/**
 * @swagger
 * /api/Countrys/{id}:
 *   delete:
 *     summary: Delete a country
 *     tags: [Countrys]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Country ID
 *     responses:
 *       200:
 *         description: Country deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Country deleted successfully
 *       404:
 *         description: Country not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Country not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred
 */
router.delete('/Countrys/:id', async (req, res) => {
  try {
    let rec =req.params.id;
    if(rec.includes('delete'))
      rec = rec.replace('delete', '');
   
    const item = await Country.findByIdAndDelete(rec);
    if (item) {
      res.json({
        status: 'success',
        message: 'Country deleted successfully',
        data: null
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Country not found',
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

module.exports = router;
