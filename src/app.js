// src/index.js

require('dotenv').config();

// const bcrypt = require('bcrypt');
const express = require('express');
// const jwt = require('jsonwebtoken');

const userRoutes = require('./routes/users');
// const authRoutes = require('./routes/authentications');

// import swagger ui module and swagger json file
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');
// const authentication = require('../swagger/authentication.json');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
// app.use('/authentication', authRoutes);
// add route for swagger document API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs/login', swaggerUi.serve, swaggerUi.setup(authentication));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
