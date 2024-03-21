// src/index.js

require('dotenv').config();

const express = require('express');

const userRoutes = require('./routes/users');
const teamRoutes = require('./routes/teams');
const matchRoutes = require('./routes/matches');

// import swagger ui module and swagger json file
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);
app.use('/matches', matchRoutes);

// add route for swagger document API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
