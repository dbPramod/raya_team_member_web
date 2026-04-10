import { useState } from 'react';
import { Nav, Modal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';

// SVG Icons
import dashboardIcon from '../../assets/svg/dashboard.svg';
import bookIcon from '../../assets/svg/book.svg';
import bookFilledIcon from '../../assets/svg/bookFilled.svg';
import folderIcon from '../../assets/svg/folder.svg';
import folderFilledIcon from '../../assets/svg/folderFilled.svg';
import paperIcon from '../../assets/svg/paper.svg';
import chartIcon from '../../assets/svg/chart.svg';
import chartFilledIcon from '../../assets/svg/chartFilled.svg';
import clockIcon from '../../assets/svg/clock.svg';
import calendarIcon from '../../assets/svg/calendar.svg';
import messagesIcon from '../../assets/svg/messages.svg';
import messagesFilledIcon from '../../assets/svg/messagesFilled.svg';
import settingIcon from '../../assets/svg/setting.svg';
import logoutIcon from '../../assets/svg/logout.svg';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: dashboardIcon, activeIcon: dashboardIcon },
    { name: 'Trainings', path: '/training', icon: bookIcon, activeIcon: bookFilledIcon },
    { name: 'Projects & Tasks', path: '/projects', icon: folderIcon, activeIcon: folderFilledIcon },
    { name: 'Swann OS', path: '/os', icon: paperIcon, activeIcon: paperIcon },
    { name: 'KPIs', path: '/kpis', icon: chartIcon, activeIcon: chartFilledIcon },
    { name: 'Time Off', path: '/timeoff', icon: clockIcon, activeIcon: clockIcon },
    { name: 'Calendar', path: '/calendar', icon: calendarIcon, activeIcon: calendarIcon },
    { name: 'Message', path: '/messages', icon: messagesIcon, activeIcon: messagesFilledIcon },
  ];

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    if (onClose) onClose();
    navigate('/login');
  };

  return (
    <>
      <aside className="bg-navy border-0 border-end border-secondary border-opacity-10 vh-100 d-flex flex-column py-4" style={{ width: '280px', minWidth: '280px', backgroundColor: '#0f1d3a' }}>
        <div className="px-4 mb-5 pb-2 d-flex align-items-center gap-2">
          <img src={appLogo} alt="Swann Ave" height="32" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>

        <Nav className="flex-column flex-grow-1 px-3 gap-2">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path) || (location.pathname === '/' && item.path === '/dashboard');
            return (
              <Nav.Link
                key={item.name}
                as={Link}
                to={item.path}
                className={`d-flex align-items-center gap-3 px-3 py-2 rounded transition-all position-relative overflow-hidden ${isActive ? 'bg-teal text-white fw-medium shadow-sm' : 'text-muted-light'}`}
                style={isActive ? { backgroundColor: '#448b8b' } : { color: '#a6b0cf' }}
                onClick={onClose}
              >
                <img
                  src={isActive ? item.activeIcon : item.icon}
                  alt={item.name}
                  style={{
                    width: '20px',
                    height: '20px',
                    filter: isActive ? 'brightness(0) invert(1)' : 'brightness(0) invert(0.75) sepia(0.2) hue-rotate(185deg) saturate(1.5)',
                  }}
                />
                <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
              </Nav.Link>
            );
          })}
        </Nav>

        <Nav className="flex-column px-3 mt-auto gap-2 border-top border-white border-opacity-10 pt-4">
          <Nav.Link
            as={Link}
            to="/settings"
            className={`d-flex align-items-center gap-3 px-3 py-2 rounded transition-all ${location.pathname === '/settings' ? 'bg-teal text-white fw-medium shadow-sm' : ''}`}
            style={location.pathname === '/settings' ? { backgroundColor: '#448b8b' } : { color: '#a6b0cf', fontSize: '0.95rem' }}
            onClick={onClose}
          >
            <img
              src={settingIcon}
              alt="Settings"
              style={{
                width: '20px',
                height: '20px',
                filter: location.pathname === '/settings' ? 'brightness(0) invert(1)' : 'brightness(0) invert(0.75) sepia(0.2) hue-rotate(185deg) saturate(1.5)',
              }}
            />
            <span>Settings</span>
          </Nav.Link>

          <Nav.Link
            href="#"
            className="d-flex align-items-center gap-3 px-3 py-2 rounded transition-all"
            style={{ fontSize: '0.95rem', color: '#e74c3c' }}
            onClick={handleLogoutClick}
          >
            <img
              src={logoutIcon}
              alt="Logout"
              style={{
                width: '20px',
                height: '20px',
                filter: 'brightness(0) saturate(100%) invert(38%) sepia(85%) saturate(1478%) hue-rotate(338deg) brightness(97%) contrast(93%)', // Matches #e74c3c roughly, or we can just use the natural red if it's already red
              }}
            />
            <span>Logout</span>
          </Nav.Link>
        </Nav>
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
        contentClassName="rounded-4 border-0 shadow"
        size="sm"
      >
        <Modal.Header className="border-0 pb-0 pt-3 px-4 d-flex justify-content-end">
          <button
            type="button"
            className="btn-close shadow-none"
            onClick={() => setShowLogoutModal(false)}
            style={{ fontSize: '0.8rem' }}
          ></button>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4 pt-1 text-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '56px', height: '56px', backgroundColor: '#fff0f0' }}
          >
            <img
              src={logoutIcon}
              alt="Logout"
              style={{
                width: '24px',
                height: '24px',
                filter: 'brightness(0) saturate(100%) invert(38%) sepia(85%) saturate(1478%) hue-rotate(338deg) brightness(97%) contrast(93%)'
              }}
            />
          </div>
          <h5 className="fw-bold mb-2" style={{ color: '#0f1d3a' }}>Logout</h5>
          <p className="text-muted small mb-4">Are you sure you want to logout from your account?</p>
          <div className="d-flex gap-3 justify-content-center">
            <button
              type="button"
              className="btn btn-light px-4 py-2 rounded-3 border fw-medium"
              style={{ minWidth: '100px' }}
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn px-4 py-2 rounded-3 fw-medium text-white shadow-sm"
              style={{ backgroundColor: '#e74c3c', minWidth: '100px' }}
              onClick={handleConfirmLogout}
            >
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Sidebar;
