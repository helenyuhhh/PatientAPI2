// swaggerConfig.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    
    info: {
      title: 'Patient API',
      version: '1.0.0',
      description: 'API documentation',
      contact: {
        name: 'MAPD713-Team 7',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/patients', // Replace with your server URL
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // Path to your route files
};

module.exports = swaggerJsDoc(swaggerOptions);
