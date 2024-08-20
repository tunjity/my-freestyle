const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API',
      version: '1.0.0',
      description: 'Node.js API with MongoDB',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./controller/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
const itemRoutes = require('./controller/itemController');
app.use('/api', itemRoutes);
const userRoutes = require('./controller/userController');
app.use('/api', userRoutes);
const gsRoutes = require('./controller/generalSetUpController');
app.use('/api', gsRoutes);

