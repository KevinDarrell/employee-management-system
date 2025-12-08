import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        
        {/* List Employees */}
        <Route path="employees" element={<EmployeeList />} />
        
        {/* Add Employee (Create) */}
        <Route path="employees/new" element={<EmployeeForm />} />
        
        {/* Edit Employee (Update) - Menangkap ID */}
        <Route path="employees/edit/:id" element={<EmployeeForm />} />
      </Route>
    </Routes>
  );
}

export default App;