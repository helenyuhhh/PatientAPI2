import mongoose from "mongoose";
const testSchema = new mongoose.Schema({
    patient_id :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required: true
    },
    // patient_id: { type: String, required: true },
    date: { type: Date, required: true },
    nurse_name: { type: String, required: true },
    // type: Test
    type: { type: String, required: false }, // to store the type: test name
    // category: Blood Pressure, cause there are many other tests, Respiratory Rate, Blood Oxygen,
    // and Heartbeat Rate
    category: { type: String, required: true },
    // readings
    reading: { // for Blood Pressure Test
               systolic: { type:Number,required: false },
               diastolic:{ type:Number,required: false },
               // for Respiratory Rate, safe for 12-18/min
               respiratory:{ type:Number, required: false},
               // for Blood Oxygen
               blood_oxygen:{ type:Number, required: false},
               // for heartbeat Rate
               heartbeat_rate:{type:Number, required: false}
              },
    // test_id
    id:{type:String, required:true}
})
// export default mongoose.model("patients", patientSchemaSchema)
export default mongoose.model("Test", testSchema)