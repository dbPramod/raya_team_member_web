import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../pages/Dashboard/Dashboard';
import MentalHistory from '../pages/Dashboard/MentalHistory';
import Training from '../pages/Training/Training';
import TrainingDetail from '../pages/Training/TrainingDetail';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import Verification from '../pages/Auth/Verification';
import ResetPassword from '../pages/Auth/ResetPassword';
import ResetSuccess from '../pages/Auth/ResetSuccess';
import CompleteProfile from '../pages/CompleteProfile/CompleteProfile';
import Settings from '../pages/Settings/Settings';
import TrainingCertificate from '../pages/Training/TrainingCertificate';
import ProjectsTasks from '../pages/ProjectsTasks/ProjectsTasks';
import ProjectDetail from '../pages/ProjectsTasks/ProjectDetail';
import TaskDetail from '../pages/ProjectsTasks/TaskDetail';
import TodoHistory from '../pages/ProjectsTasks/TodoHistory';
import SwannOS from '../pages/SwannOS/SwannOS';
import KPIs from '../pages/KPIs/KPIs';
import KPIHistory from '../pages/KPIs/KPIHistory';
import TimeOff from '../pages/TimeOff/TimeOff';
import Calendar from '../pages/Calendar/Calendar';
import Messages from '../pages/Messages/Messages';
import Notifications from '../pages/Notifications/Notifications';
import Search from '../pages/Search/Search';
import Logout from '../pages/Auth/Logout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/mental-history" element={<MentalHistory />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/detail" element={<TrainingDetail />} />
        <Route path="/training/certificate" element={<TrainingCertificate />} />
        <Route path="/projects" element={<ProjectsTasks />} />
        <Route path="/projects/detail" element={<ProjectDetail />} />
        <Route path="/projects/task-detail" element={<TaskDetail />} />
        <Route path="/projects/todo-history" element={<TodoHistory />} />
        <Route path="/os" element={<SwannOS />} />
        <Route path="/kpis" element={<KPIs />} />
        <Route path="/kpis/history" element={<KPIHistory />} />
        <Route path="/timeoff" element={<TimeOff />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/members" element={<div className="container py-4"><h1>Members</h1></div>} />
        <Route path="/settings" element={<Settings />} />
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
