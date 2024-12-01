import express from "express"
import Patient from "../models/patients.js"
import Test from "../models/tests.js"
import mongoose from "mongoose";
const router = express.Router();

// getting all patients
/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     description: Returns a list of all the patients.
 *     responses:
 *       200:
 *         description: Patient List.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/', async(req, res) =>{
   try{
      const patients = await Patient.find() // get all the patients from the patiens
      res.json(patients)
   } catch (error) {
      res.status(500).json({ message: error.message})
   }
})

// getting one patients by id?
/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient Get.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Patient not found.
 */
router.get('/:id', getPatient, (req, res)=>{
   res.send(res.patient)// returning the patient name with specific id
})
// creating one
/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Add a new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               room:
 *                 type: string
 *               clinical:
 *                 type: object
 *               weight:
 *                 type: string
 *               height:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               picture:
 *                 type: string
 *               tests:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Patient added.
 *       400:
 *         description: Bad request.
 */
router.post('/', async(req, res)=>{
   // const {name, age, gender, room, clinical, weight, height, date} = req.body
   const patient = new Patient({
      name:req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      room: req.body.room,
      condition: req.body.condition,
      weight: req.body.weight,
      height: req.body.height,
      date: req.body.date,
      tests:req.body.tests,
      picture: req.body.picture
   })
   try {
     const newPatient = await patient.save()
     res.status(201).json(newPatient)
   } catch (error) {
      res.status(400).json({ message: error.message})
   }
  
})
// only update the data that we sent 
/**
 * @swagger
 * /api/patients/{id}:
 *   patch:
 *     summary: Update a patient's data with given info
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room:
 *                 type: string
 *               weight:
 *                 type: string
 *               height:
 *                 type: string
 *               gender:
 *                 type: string
 *               date:
 *                 type: string
 *               tests:
 *                 type: array
 *     responses:
 *       200:
 *         description: Patient Data updated.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Patient not found.
 */
router.patch('/:id', getPatient, async(req, res)=>{
   if (req.body.condition != null) {
      res.patient.condition = req.body.condition
   }
   if (req.body.room != null) {
      res.patient.room = req.body.room
   }
   if (req.body.date != null) {
      res.patient.date = req.body.date
   }
   if (req.body.weight != null) {
      res.patient.weight = req.body.weight
   }
   if (req.body.picture != null) {
      res.patient.picture = req.body.picture
   }
   if (req.body.gender != null) {
      res.patient.gender = req.body.gender
   }
   if (req.body.tests != null) {
      res.patient.tests = req.body.tests
   }
   try {
      const updatedClinical = await res.patient.save()
      res.json(updatedClinical)
   }catch(error){
      res.status(400).json({message: error.message})
   }
})
// deleting one
/**
 * @swagger
 * /api/patients/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the patient to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: Patient not found.
 */
router.delete('/:id', getPatient, async(req, res)=>{
  // res.patient
  try{
   await res.patient.deleteOne()
   res.json({message:"Patient Deleted!"})
  }catch(error){
   res.status(500).json({message: error.message})
  }
})
/********************************************************TESTS***************************************************** */
// get patient's test list by passing the id, it's working now
/**
 * @swagger
 * /api/patients/{id}/tests:
 *   get:
 *     summary: Get all tests for a specific patient
 *     description: Retrieve all test records with a given patient id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient.
 *     responses:
 *       200:
 *         description: Tests list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   patient_id:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   nurse_name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   category:
 *                     type: string
 *                   reading:
 *                     type: object
 *                     properties:
 *                       blood_pressure:
 *                         type: object
 *                         properties:
 *                           systolic:
 *                             type: integer
 *                           diastolic:
 *                             type: integer
 *                       respiratory_rate:
 *                         type: integer
 *                       blood_oxygen_level:
 *                         type: integer
 *                       heartbeat_rate:
 *                         type: integer
 *       500:
 *         description: Server error
 */
router.get('/:id/tests', async(req, res)=>{
   try{
      const tests = await Test.find()
      res.json(tests)
   } catch (error) {
      res.status(500).json({ message: error.message})
   }
})
// get test by id
/**
 * @swagger
 * /api/patients/{id}/tests/{testid}:
 *   get:
 *     summary: Get a test by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the test to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Test.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   patient_id:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   nurse_name:
 *                     type: string
 *                   type:
 *                     type: string
 *                   category:
 *                     type: string
 *                   reading:
 *                     type: object
 *                     properties:
 *                       blood_pressure:
 *                         type: object
 *                         properties:
 *                           systolic:
 *                             type: integer
 *                           diastolic:
 *                             type: integer
 *                       respiratory_rate:
 *                         type: integer
 *                       blood_oxygen_level:
 *                         type: integer
 *                       heartbeat_rate:
 *                         type: integer
 *       500:
 *         description: Server error
 */
router.get('/:id/tests/:testid', getTest, (req, res)=>{
   // returning the patient name with specific id
   // first check if the patient exist
   // then check if the test id exist
   res.send(res.test)
})
// post test by its id
/**
 * @swagger
 * /api/patients/{id}/tests:
 *   post:
 *     summary: Add a new test
 *     description: Create a new test and add it to test array
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               nurse_name:
 *                 type: string
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *               reading:
 *                 type: object
 *                 properties:
 *                   blood_pressure:
 *                     type: object
 *                     properties:
 *                       systolic:
 *                         type: integer
 *                       diastolic:
 *                         type: integer
 *                   respiratory_rate:
 *                     type: integer
 *                   blood_oxygen_level:
 *                     type: integer
 *                   heartbeat_rate:
 *                     type: integer
 *     responses:
 *       201:
 *         description: Test created
 *       400:
 *         description: Test already exists or validation error
 *       500:
 *         description: Server error
 */
router.post('/:id/tests', getPatient,async(req, res)=>{
   // const {name, age, gender, room, clinical, weight, height, date} = req.body
   // check if ther's any existed tests, check the date, cat and nurse
   const foundText = res.patient.tests.find(test => 
      test.date === req.body.date &&
      test.category === req.body.category &&
      test.nurse_name === req.body.nurse_name
   )
   if (foundText) {
      res.status(400).json({ message: "Test exists!"})
   
   }
   const test = new Test({
      patient_id: req.params.id,
      date: req.body.date,
      nurse_name: req.body.nurse_name,
      type: req.body.type, 
      category: req.body.category,
      reading: req.body.reading,
      id:req.body.id
   })
      try {
         const newTest = await test.save()
         res.patient.tests.push(newTest)
         res.status(201).json(newTest)
       } catch (error) {
          res.status(400).json({ message: error.message})
       }
      
    })


// patch test information by id
/**
 * @swagger
 * /api/patients/{id}/tests/{testid}:
 *   patch:
 *     summary: Update a specific test by test ID
 *     description: Update the tests with data provided
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient.
 *       - in: path
 *         name: testid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the test.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reading:
 *                 type: object
 *                 properties:
 *                   blood_pressure:
 *                     type: object
 *                     properties:
 *                       systolic:
 *                         type: integer
 *                       diastolic:
 *                         type: integer
 *                   respiratory_rate:
 *                     type: integer
 *                   blood_oxygen_level:
 *                     type: integer
 *                   heartbeat_rate:
 *                     type: integer
 *               date:
 *                 type: string
 *                 format: date
 *               nurse_name:
 *                 type: string
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Test updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patient_id:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 nurse_name:
 *                   type: string
 *                 type:
 *                   type: string
 *                 category:
 *                   type: string
 *                 reading:
 *                   type: object
 *                   properties:
 *                     blood_pressure:
 *                       type: object
 *                       properties:
 *                         systolic:
 *                           type: integer
 *                         diastolic:
 *                           type: integer
 *                     respiratory_rate:
 *                       type: integer
 *                     blood_oxygen_level:
 *                       type: integer
 *                     heartbeat_rate:
 *                       type: integer
 *       400:
 *         description: Validation or request error
 *       404:
 *         description: Test not found
 *       500:
 *         description: Server error
 */
router.patch('/:id/tests/:testid', getTest, async(req, res)=>{
   // update the reading
   if (req.body.reading != null) {
      if(req.body.reading.category == "Blood Pressure") {
         res.test.reading.blood_pressure.systolic = req.body.reading.blood_pressure.systolic
         res.test.reading.blood_pressure.diastolic = req.body.reading.blood_pressure.diastolic
      }
      res.test.reading = req.body.reading
   }
   // update the date
   if (req.body.date != null) {
      res.test.date = req.body.date
   }
   // update the nurse
   if (req.body.nurse_name != null) {
      res.test.nurse_name = req.body.nurse_name
   }
   // update the type
   if (req.body.type != null) {
      res.test.type = req.body.type
   }
   // update the category
   if (req.body.category != null) {
      res.test.category = req.body.category
   }
   
   try {
      const updatedTest = await res.test.save()
      res.json(updatedTest)
   }catch(error){
      res.status(400).json({message: error.message})
   }
})
// add delete function, removes the test from tests array
/**
 * @swagger
 * /api/patients/{id}/tests/{testid}:
 *   delete:
 *     summary: Delete a specific test by test ID
 *     description: Remove a test by its id from the tests list
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the patient.
 *       - in: path
 *         name: testid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the test.
 *     responses:
 *       200:
 *         description: Test deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Test deleted successfully"
 *       400:
 *         description: Deletion or request error
 *       404:
 *         description: Test not found
 *       500:
 *         description: Server error
 */
router.delete('/:id/tests/:testid', getPatient, async (req, res) => {
   // convert the id to objectID
   const testID = new mongoose.Types.ObjectId(req.params.testid)
   try{
      await res.patient.updateOne(
         { _id: req.params.id },  // Find the patient by their ID
         { $pull: { tests: { _id: testID } } })
         res.status(200).json({ message: 'Test deleted successfully' });
   }catch(error){
      res.status(400).json({message: error.message})
   }

});
// a function can be called multi times
async function getPatient(req, res, next){
   let patient1
   try{
     patient1 = await Patient.findById(req.params.id)
     if (patient1 == null){
      return res.status(404).json({messsage: 'Cannot find patient'})
     }
   }catch(error){
      return res.status(500).json({ message: error.message})
   }
   res.patient = patient1
   next()
}
async function getTest(req, res, next){
   let test1
   try{
     test1 = await Test.findById(req.params.testid)
     if (test1 == null){
      return res.status(404).json({messsage: 'Cannot find patient'})
     }
   }catch(error){
      return res.status(500).json({ message: error.message})
   }
   res.test = test1
   next()
}


export default router;