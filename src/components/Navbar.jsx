import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <i className="bi bi-lightning-charge-fill me-2"></i>
          YouthMatch
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/opportunities') ? 'active' : ''}`} to="/opportunities">
                Opportunities
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/saved') ? 'active' : ''}`} to="/saved">
                Saved
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/applications') ? 'active' : ''}`} to="/applications">
                Applications
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/profile') ? 'active' : ''}`} to="/profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;