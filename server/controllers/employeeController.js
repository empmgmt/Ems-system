import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js";

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
const addEmployee = async (req, res) => {
  try {
    const { name, email, employeeId, dob, gender, maritalStatus, designation, department, salary, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already registered with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
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

  // ✅ Step 1: Validate the ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: "Invalid employee ID format" });
  }

  try {
    // ✅ Step 2: Find the employee by ID
    let employee = await Employee.findById(id)
      .populate("userId", { password: 0 }) // Exclude password
      .populate("department");

    // ✅ Step 3: If not found, try finding by userId
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    // ✅ Step 4: If still not found, return 404 error
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error in getEmployeeById:", error);
    return res.status(500).json({
      success: false,
      error: "Server error in fetching employee",
    });
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
      user.profileImage = req.file.filename;
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

export { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, upload, fetchEmployeesByDepId };
