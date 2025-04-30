
import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js";
import Attendance from "../models/Attendance.js";

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Controller to add an employee
// Controller to add an employee
const addEmployee = async (req, res) => {
    try {
      const {
        name,
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role,
        contactNumber,  // Added contactNumber field
      } = req.body;
  
      // Check if user already exists with this email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, error: "User already registered with this email" });
      }
  
      // Check if employeeId is already used
      const existingEmpId = await Employee.findOne({ employeeId });
      if (existingEmpId) {
        return res.status(400).json({ success: false, error: "Employee ID already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create and save the User
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        profileImage: req.file ? req.file.filename : "", // Check for file upload
      });
  
      const savedUser = await newUser.save();
  
      // Create and save the Employee
      const newEmployee = new Employee({
        userId: savedUser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        contactNumber,  // Save the contact number
      });
  
      await newEmployee.save();
  
      return res.status(201).json({ success: true, message: "Employee created successfully" });
    } catch (error) {
      console.error("Error in addEmployee:", error);
      return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
  };
  

// Controller to get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", "-password") // Exclude password field
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error in getAllEmployees:", error);
    return res.status(500).json({ success: false, error: "Server error in fetching employees" });
  }
};

// Controller to get a specific employee by ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  // Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid employee ID format" });
  }

  try {
    // Find the employee by ID
    let employee = await Employee.findById(id)
      .populate("userId", { password: 0 }) // Exclude password
      .populate("department");

    // If employee not found by ID, try userId
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    // If still not found, return 404 error
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error in getEmployeeById:", error);
    return res.status(500).json({ success: false, error: "Server error in fetching employee" });
  }
};

// Controller to update an employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid employee ID" });
    }

    // Find the employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Find the associated user
    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Update the user's name and optionally the profile image
    user.name = name;
    if (req.file) {
      user.profileImage = req.file.filename; // Handle profile image change
    }
    await user.save();

    // Update the employee details
    employee.maritalStatus = maritalStatus;
    employee.designation = designation;
    employee.department = department;
    employee.salary = salary;
    await employee.save();

    return res.status(200).json({ success: true, message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error in updateEmployee:", error);
    return res.status(500).json({ success: false, error: "Server error in updating employee" });
  }
};

// Controller to fetch employees by department ID
const fetchEmployeesByDepId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid department ID" });
    }

    const employees = await Employee.find({ department: id }).populate("userId", "-password");

    if (!employees || employees.length === 0) {
      return res.status(404).json({ success: false, error: "No employees found for this department" });
    }

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error in fetchEmployeesByDepId:", error);
    return res.status(500).json({ success: false, error: "Server error in fetching employees by department ID" });
  }
};

// Controller to delete an employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid employee ID" });
    }

    // Find and delete the employee
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Delete the associated user
    await User.findByIdAndDelete(employee.userId);

    // Delete attendance records for that employee
    await Attendance.deleteMany({ employeeId: employee._id });

    return res.status(200).json({ success: true, message: "Employee and related attendance deleted successfully" });
  } catch (error) {
    console.error("Error in deleteEmployee:", error);
    return res.status(500).json({ success: false, error: "Server error in deleting employee" });
  }
};

export { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, upload, fetchEmployeesByDepId, deleteEmployee };
