import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import appLogo from '../../assets/images/applogo.png';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'bi-grid' },
    { name: 'Training', path: '/training', icon: 'bi-book' },
    { name: 'Projects & Tasks', path: '/projects', icon: 'bi-folder' },
    { name: 'Swann OS', path: '/os', icon: 'bi-file-text' },
    { name: 'KPIs', path: '/kpis', icon: 'bi-bar-chart' },
    { name: 'Time Off', path: '/timeoff', icon: 'bi-clock' },
    { name: 'Calendar', path: '/calendar', icon: 'bi-calendar-event' },
    { name: 'Message', path: '/messages', icon: 'bi-chat-dots' },
  ];

  const bottomItems = [
    { name: 'Settings', path: '/settings', icon: 'bi-gear' },
    { name: 'Logout', path: '/logout', icon: 'bi-box-arrow-right', color: 'text-danger' },
  ];

  return (
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
              <i className={`bi ${item.icon} fs-5`}></i>
              <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
            </Nav.Link>
          );
        })}
      </Nav>

      <Nav className="flex-column px-3 mt-auto gap-2 border-top border-white border-opacity-10 pt-4">
        {bottomItems.map((item) => (
          <Nav.Link 
            key={item.name}
            as={Link} 
            to={item.path} 
            className={`d-flex align-items-center gap-3 px-3 py-2 rounded transition-all ${location.pathname === item.path ? 'bg-teal text-white fw-medium shadow-sm' : (item.color || 'text-muted-light')}`}
            style={location.pathname === item.path ? { backgroundColor: '#448b8b' } : (!item.color ? { color: '#a6b0cf', fontSize: '0.95rem' } : { fontSize: '0.95rem', color: '#e74c3c' })}
            onClick={onClose}
          >
            <i className={`bi ${item.icon} fs-5`}></i>
            <span>{item.name}</span>
          </Nav.Link>
        ))}
      </Nav>
    </aside>
  );
};

export default Sidebar;
