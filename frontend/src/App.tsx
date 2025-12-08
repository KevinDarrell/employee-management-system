import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList'; 


const EmployeeForm = () => <div className="p-4">Form Page (Coming Soon)</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<EmployeeList />} /> 
        
       
        <Route path="employees/new" element={<EmployeeForm />} />
        <Route path="employees/edit/:id" element={<EmployeeForm />} />
      </Route>
    </Routes>
  );
}

export default App;