import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="d-flex vh-100 position-relative w-100 overflow-hidden" style={{ backgroundColor: '#0f1d3a' }}>
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" 
          style={{ zIndex: 1040 }} 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Wrapper */}
      <div 
        className={`sidebar-wrapper d-flex flex-column transition-all ${sidebarOpen ? 'sidebar-open' : ''}`}
        style={{ zIndex: 1045 }}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-grow-1 p-3 ps-lg-0 d-flex flex-column h-100 overflow-hidden w-100">
        <div className="bg-white flex-grow-1 d-flex flex-column overflow-hidden shadow-sm" style={{ borderRadius: '16px', position: 'relative' }}>
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="px-4 py-4 flex-grow-1 overflow-auto bg-white">
            <div key={location.pathname} className="app-route-transition">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
