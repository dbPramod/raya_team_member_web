import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'bi-grid' },
    { name: 'Training', path: '/training', icon: 'bi-journal-bookmark' },
    { name: 'Projects & Tasks', path: '/projects', icon: 'bi-folder' },
    { name: 'Assessments', path: '/assessments', icon: 'bi-file-text' },
    { name: 'Leaderboard', path: '/leaderboard', icon: 'bi-bar-chart' },
    { name: 'Calendar', path: '/calendar', icon: 'bi-calendar-event' },
    { name: 'Message', path: '/messages', icon: 'bi-chat-dots' },
  ];

  const bottomItems = [
    { name: 'Settings', path: '/settings', icon: 'bi-gear' },
    { name: 'Logout', path: '/logout', icon: 'bi-box-arrow-right', color: 'text-danger' },
  ];

  return (
    <aside className="bg-navy border-end border-secondary border-opacity-25 vh-100 d-flex flex-column py-4" style={{ width: '260px', minWidth: '260px', backgroundColor: '#0f1d3a' }}>
      <div className="px-4 mb-5">
        <h1 className="fw-bold text-white fs-4 mb-0">
          SWANN <span className="text-teal" style={{ color: '#3d8b8b' }}>AVE</span>
        </h1>
      </div>
      
      <Nav className="flex-column flex-grow-1 px-3 gap-1">
        {menuItems.map((item) => (
          <Nav.Link 
            key={item.name}
            as={Link} 
            to={item.path} 
            className={`d-flex align-items-center gap-3 px-3 py-2 rounded transition-all ${location.pathname === item.path ? 'bg-teal text-white fw-semibold' : 'text-muted-light'}`}
            style={location.pathname === item.path ? { backgroundColor: '#3d8b8b' } : { color: '#a6b0cf' }}
          >
            <i className={`bi ${item.icon} fs-5`}></i>
            <span>{item.name}</span>
          </Nav.Link>
        ))}
      </Nav>

      <Nav className="flex-column px-3 mt-auto gap-1 border-top border-white border-opacity-10 pt-4">
        {bottomItems.map((item) => (
          <Nav.Link 
            key={item.name}
            as={Link} 
            to={item.path} 
            className={`d-flex align-items-center gap-3 px-3 py-2 rounded ${item.color || 'text-muted-light'}`}
            style={!item.color ? { color: '#a6b0cf' } : {}}
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
