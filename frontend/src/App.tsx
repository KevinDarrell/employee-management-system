import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';


const EmployeeList = () => <div className="p-4">Employee List Page (Coming Soon)</div>;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<EmployeeList />} />
      </Route>
    </Routes>
  );
}

export default App;