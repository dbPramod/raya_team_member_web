import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import Training from '../pages/Training/Training';
import TrainingDetail from '../pages/Training/TrainingDetail';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Verification from '../pages/Auth/Verification';
import ResetPassword from '../pages/Auth/ResetPassword';
import ResetSuccess from '../pages/Auth/ResetSuccess';
import CompleteProfile from '../pages/CompleteProfile/CompleteProfile';
import Logout from '../pages/Auth/Logout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/detail" element={<TrainingDetail />} />
        <Route path="/members" element={<div className="container py-4"><h1>Members</h1></div>} />
        <Route path="/settings" element={<div className="container py-4"><h1>Settings</h1></div>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-success" element={<ResetSuccess />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<MainLayout><div className="container text-center py-5"><h1>404</h1></div></MainLayout>} />
    </Routes>
  );
};

export default AppRoutes;
