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

const getDepartmentSalarySummary = async (req, res) => {
  try {
    const salaries = await Salary.find().populate({
      path: 'employeeId',
      populate: {
        path: 'department',
        select: 'dep_name'
      }
    });

    const summary = {};

    salaries.forEach(salary => {
      const depName = salary.employeeId?.department?.dep_name || 'Unknown';
      const amount = salary.netSalary || 0;

      if (!summary[depName]) {
        summary[depName] = 0;
      }
      summary[depName] += amount;
    });

    const result = Object.entries(summary).map(([depName, total]) => ({
      depName,
      totalSalary: total.toFixed(2)
    }));

    return res.status(200).json({ success: true, salaries: result });
  } catch (error) {
    console.error("Error in getDepartmentSalarySummary:", error);
    return res.status(500).json({ success: false, error: "Error generating salary summary" });
  }
};

const getSalariesByDepartment = async (req, res) => {
  try {
    const { departmentName } = req.params;

    const employees = await Employee.find().populate('department', 'dep_name');

    const filteredEmployees = employees.filter(emp => emp.department?.dep_name === departmentName);

    const employeeIds = filteredEmployees.map(emp => emp._id);

    const salaries = await Salary.find({ employeeId: { $in: employeeIds } })
      .populate('employeeId', 'name employeeId email');

    return res.status(200).json({ success: true, salaries });
  } catch (error) {
    console.error("Error fetching salaries by department:", error);
    return res.status(500).json({ success: false, error: "Error fetching employee salaries" });
  }
};

export { addSalary, getSalary, getDepartmentSalarySummary, getSalariesByDepartment };
