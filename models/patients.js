import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    name:{
        first: { type: String, required: true },
        last: { type: String, required: true }
    },
    age:{
      type: Number,
      required: true
    },
    gender:{
      type: String,
      required: true
    },
    room: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    tests: [
      {
        patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: false , required: false},
        date: { type:String, required: false},
        nurse_name: { type:String, required: false},
        type: { type:String, required: false}, 
        category: { type:String, required: false},
        reading: { 
          blood_pressure:{ 
            systolic:{type:Number, required: false},
            diastolic:{type:Number, required: false}
          },
          respiratory_rate:{ type:Number, required: false},
          blood_oxygen_level:{ type:Number, required: false},
          heartbeat_rate:{ type:Number, required: false}
        },
      }

    ],
    weight: {
      type: String,
      required: true
    },
    height:{
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    picture: {
      type: String,
      required: false
    }
    
    
})
// export default mongoose.model("patients", patientSchemaSchema)
export default mongoose.model("Patient", patientSchema)