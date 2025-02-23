import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AddDepartment from "./components/department/AddDepartment";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/AdminSummary";
import Departmentlist from "./components/department/Departmentlist";
import List from "./components/employee/List";
import AddEmployee from "./components/employee/AddEmployee";
import Salary from "./components/employee/Salary";
import Leave from "./components/department/Leave";
import Setting from "./components/department/Setting";
import EditDepartment from "./components/department/EditDepartment";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import EmpSalary from "../EmployeeDashboard/EmpSalary";
import Profile from "../EmployeeDashboard/Profile";
import AddLeave from "../EmployeeDashboard/leave/AddLeave";
import Summary from "../EmployeeDashboard/Summary";
import EmpLeave from "../EmployeeDashboard/EmpLeave";
import SalaryView from "./components/employee/salaryView";
import EmpSetting from "../EmployeeDashboard/EmpSetting";
import ViewLeave from "../EmployeeDashboard/leave/ViewLeave";
import EmployeeLeaveHistory from "./components/employee/EmployeeLeaveHistory";
import Attendance from "../EmployeeDashboard/Attendance/attendance";
import AttendanceReport from "../EmployeeDashboard/Attendance/AttendanceReport";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin-dashboard/*"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<AdminSummary />} />
          <Route path="departmentlist" element={<Departmentlist />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          <Route path="employees/salary/:id" element={<SalaryView />} />
          <Route path="add" element={<AddEmployee />} />
          <Route path="list" element={<List />} />
          <Route path="salary" element={<Salary />} />
          <Route path="leave" element={<Leave />} />
          <Route path="setting" element={<EmpSetting />} />
          <Route path="view-leave/:id" element={<ViewLeave />} /> {/* Added ViewLeave route */}
          <Route path="employees/:id/leave-history" element={<EmployeeLeaveHistory />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendancereport" element={<AttendanceReport />} />
        </Route>

        {/* Employee Dashboard Routes */}
        <Route
          path="/employee-dashboard/*"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />} />
          <Route path="profile" element={<Profile />} />
          <Route path="salary/:id" element={<SalaryView />} />
          <Route path="leaves" element={<EmpLeave />} />
          <Route path="setting" element={<EmpSetting />} />
          <Route path="profile/:id" element={<View />} />
          <Route path="add-leave" element={<AddLeave />} />
          <Route path="view-leave/:id" element={<ViewLeave />} /> {/* Added ViewLeave route */}
         
        </Route>

        {/* Unauthorized Route (Fallback) */}
        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;