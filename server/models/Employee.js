import mongoose from "mongoose";
import { Schema } from "mongoose";

const employeeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true },
  dob: { type: Date },
  gender: { type: String },
  maritalStatus: { type: String },
  designation: { type: String },
  department: { type: Schema.Types.ObjectId, ref: "Department" }, // Corrected to reference Department model
  salary: { type: Number, required: true },
  contactNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v); // Ensures the contact number is a 10-digit number starting with 6-9
      },
      message: props => `${props.value} is not a valid 10-digit contact number!`
    }
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
