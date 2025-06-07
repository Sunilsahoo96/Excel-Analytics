import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard'
import DashboardLayout from './pages/DashboarLayout';
import DashboardCards from './pages/DashboardCard';
import MyAccountPage from './pages/MyAccount';
import VisualizePage from './pages/Visualize';
import MyUploads from './pages/History';
import AccountSection from './pages/AccountSection';
import SecuritySection from './pages/SecuritySection';
import TeamSection from './pages/TeamSection';
import "./App.css";
import AdminPanel from './pages/AdminPanel';
import TotalUser from './pages/TotalUser';
import TotalFile from './pages/TotalFile';
import AdminStats from './pages/AdminStats';


function App() {
  return (

    <div id='root' >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/visualize" element={<VisualizePage />} />

          <Route path="/admin-panel" element={<AdminPanel />}>
            <Route index element={<AdminStats />} />
            <Route path='total-user' element={<TotalUser />} />
            <Route path='total-file' element={<TotalFile />} />
          </Route>

          <Route path="/dashboard-layout" element={<DashboardLayout />} >
            <Route index element={<DashboardCards />} />
          </Route>


          <Route path="/account" element={<MyAccountPage />}>
            <Route index element={<AccountSection />} />
            <Route path="security" element={<SecuritySection />} />
            <Route path="team" element={<TeamSection />} />
            <Route path="history" element={<MyUploads />} />
          </Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
