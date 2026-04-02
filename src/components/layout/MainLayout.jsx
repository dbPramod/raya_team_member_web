import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div className="d-flex vh-100 position-relative" style={{ backgroundColor: '#0f1d3a' }}>
      <Sidebar />
      <div className="flex-grow-1 p-3 ps-0 d-flex flex-column h-100 overflow-hidden">
        <div className="bg-white flex-grow-1 d-flex flex-column overflow-hidden shadow-sm" style={{ borderRadius: '16px', position: 'relative' }}>
          <Navbar />
          <main className="px-4 py-4 flex-grow-1 overflow-auto bg-white">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
