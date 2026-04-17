import React, { useEffect, useState } from 'react';
import { Container, Navbar as BsNavbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationIcon } from '../../constants/svgImages';

const NAVBAR_PROFILE_STORAGE_KEY = 'swann-navbar-profile';
const DEFAULT_NAVBAR_PROFILE = {
  name: 'Sapphire Bright',
  avatar: 'https://i.pravatar.cc/150?u=sapphire',
  role: 'UI/UX Designer'
};

const getStoredNavbarProfile = () => {
  if (typeof window === 'undefined') return DEFAULT_NAVBAR_PROFILE;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(NAVBAR_PROFILE_STORAGE_KEY) || '{}');
    return {
      ...DEFAULT_NAVBAR_PROFILE,
      ...parsed
    };
  } catch (error) {
    return DEFAULT_NAVBAR_PROFILE;
  }
};

const Navbar = ({ onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [navbarProfile, setNavbarProfile] = useState(() => getStoredNavbarProfile());
  const navigate = useNavigate();

  useEffect(() => {
    const syncProfile = () => {
      setNavbarProfile(getStoredNavbarProfile());
    };

    const handleCustomProfileUpdate = (event) => {
      if (event?.detail) {
        setNavbarProfile({
          ...DEFAULT_NAVBAR_PROFILE,
          ...event.detail
        });
        return;
      }

      syncProfile();
    };

    window.addEventListener('storage', syncProfile);
    window.addEventListener('swann:profile-updated', handleCustomProfileUpdate);

    return () => {
      window.removeEventListener('storage', syncProfile);
      window.removeEventListener('swann:profile-updated', handleCustomProfileUpdate);
    };
  }, []);

  const getProfileInitials = (name) => {
    if (!name) {
      return 'SB';
    }

    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <BsNavbar bg="white" className="px-3 py-3 border-bottom border-light d-flex flex-row flex-nowrap align-items-center justify-content-between">
      <div className="d-flex align-items-center flex-grow-1 me-2">
        <button
          className="btn btn-link text-dark p-0 me-3 d-lg-none flex-shrink-0"
          onClick={onToggleSidebar}
        >
          <i className="bi bi-list fs-2"></i>
        </button>

        <Form onSubmit={handleSearch} className="d-flex flex-grow-1 ms-1 ms-lg-0 me-2 navbar-search-form">
          <div className="position-relative w-100">
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: '#94a3b8', fontSize: '0.9rem' }}></i>
            <FormControl
              type="search"
              placeholder="Search..."
              className="ps-5 bg-white shadow-none navbar-search-input"
              style={{
                borderRadius: '10px',
                border: '1px solid var(--color-gray-light)',
                color: '#334155'
              }}
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Form>
      </div>

      <Nav className="ms-auto d-flex flex-row flex-nowrap align-items-center gap-1 gap-sm-3 pe-0">
        <Link
          to="/notifications"
          className="d-flex align-items-center justify-content-center text-decoration-none"
          style={{ transition: 'all 0.2s', flexShrink: 0 }}
        >
          <img src={NotificationIcon} alt="Notification" width="20" height="20" />
        </Link>
        <Link to="/settings" className="text-decoration-none d-flex align-items-center gap-2 pointer border-0 bg-transparent p-0 ms-1">
          {navbarProfile.avatar ? (
            <img
              src={navbarProfile.avatar}
              alt={navbarProfile.name}
              className="rounded-circle shadow-sm"
              width="40"
              height="40"
              style={{ border: '2px solid var(--color-navy-primary)' }}
            />
          ) : (
            <div
              className="rounded-circle shadow-sm d-flex align-items-center justify-content-center fw-semibold text-white"
              style={{ width: '40px', height: '40px', background: 'linear-gradient(140deg, #0f3780 0%, #40878e 100%)', fontSize: '0.75rem', border: '2px solid var(--color-navy-primary)', backgroundClip: 'content-box' }}
            >
              {getProfileInitials(navbarProfile.name)}
            </div>
          )}
          <div className="d-none d-sm-flex flex-column lh-1 text-start">
            <span className="fw-semibold text-dark" style={{ fontSize: '0.95rem' }}>{navbarProfile.name}</span>
            <span className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px' }}>{navbarProfile.role || 'UI/UX Designer'}</span>
          </div>
        </Link>
      </Nav>
    </BsNavbar>
  );
};

export default Navbar;
