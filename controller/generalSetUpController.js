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
    res.json({
      status: 'success',
      message: 'States retrieved successfully',
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
    const Countrys = await Country.find();
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

module.exports = router;
