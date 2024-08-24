const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authMiddleware = require('./services/authMiddleWare');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API',
      version: '1.0.0',
      description: 'Node.js API with MongoDB',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Specify that it's a JWT token
        },
      },
    },
    security: [
      {
        bearerAuth: [], // Apply the bearerAuth globally to all routes
      },
    ],
  },
  apis: ['./controller/*.js'], // Point to your API routes and controllers
};

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Not protected routes
const authenticationRoutes = require('./controller/authenticationController');
app.use('/api', authenticationRoutes);

// Protected routes
const itemRoutes = require('./controller/itemController');
app.use('/api', authMiddleware, itemRoutes);

const userRoutes = require('./controller/userController');
app.use('/api', authMiddleware, userRoutes);

const gsRoutes = require('./controller/generalSetUpController');
app.use('/api', authMiddleware, gsRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
