import Department from "../models/Department.js";

// ✅ Get all departments
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error fetching departments" });
  }
};

// ✅ Add a new department
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({ dep_name, description });
    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error adding department" });
  }
};

// ✅ Get a specific department by ID
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    if (!department) return res.status(404).json({ success: false, error: "Department not found" });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error fetching department" });
  }
};

// ✅ Update a department by ID
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    const updatedDep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true }
    );

    if (!updatedDep) return res.status(404).json({ success: false, error: "Department not found" });

    return res.status(200).json({ success: true, department: updatedDep });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error updating department" });
  }
};

// ✅ Delete a department by ID
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);
    if (!department) return res.status(404).json({ success: false, error: "Department not found" });

    return res.status(200).json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error deleting department" });
  }
};

export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };
