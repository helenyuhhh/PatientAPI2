import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/patientsRouter.js";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app = express();
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
        url: 'http://172.16.7.126:8080', 
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // Path to your route files
};
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
dotenv.config();

const PORT = process.env.PORT || 8000;
const mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl).then(()=>{
    console.log("Connection success");
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error)=>console.log(error));
app.use("/api/patients", router);