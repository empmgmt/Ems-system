import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

    const totalSalary = parseFloat(basicSalary) + parseFloat(allowances) - parseFloat(deductions);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary: totalSalary,
      payDate
    });

    await newSalary.save();

    return res.status(200).json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Salary processing error" });
  }
};

const getSalary = async (req, res) => {
  try {
    const { id } = req.params;

    let salary = await Salary.find({ employeeId: id }).populate('employeeId', 'name email employeeId');

    if (!salary.length) {
      const employee = await Employee.findOne({ userId: id });
      if (employee) {
        salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'name email employeeId');
      }
    }

    if (!salary.length) {
      return res.status(404).json({ success: false, error: "Salary details not found" });
    }

    return res.status(200).json({ success: true, salary });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error fetching salary details" });
  }
};


export { addSalary, getSalary };
