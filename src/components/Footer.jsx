import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/skills';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="mb-3">
              <i className="bi bi-lightning-charge-fill me-2"></i>
              YouthMatch
            </h5>
            <p className="text-secondary">
              Discover opportunities that match your potential. Scholarships, internships, training programs, and more for young professionals.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light" aria-label="Facebook">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-light" aria-label="Twitter">
                <i className="bi bi-twitter-x fs-5"></i>
              </a>
              <a href="#" className="text-light" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="#" className="text-light" aria-label="Instagram">
                <i className="bi bi-instagram fs-5"></i>
              </a>
            </div>
          </div>
          <div className="col-md-2">
            <h6 className="mb-3">Navigation</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-secondary text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/opportunities" className="text-secondary text-decoration-none">Opportunities</Link>
              </li>
              <li className="mb-2">
                <Link to="/dashboard" className="text-secondary text-decoration-none">Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-secondary text-decoration-none">Profile</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="mb-3">Categories</h6>
            <ul className="list-unstyled">
              {CATEGORIES.map(category => (
                <li key={category} className="mb-2">
                  <Link to="/opportunities" className="text-secondary text-decoration-none">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/saved" className="text-secondary text-decoration-none">Saved Opportunities</Link>
              </li>
              <li className="mb-2">
                <Link to="/applications" className="text-secondary text-decoration-none">Track Applications</Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-secondary text-decoration-none">Build Profile</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-secondary" />
        <div className="text-center text-secondary">
          <p className="mb-0">&copy; 2026 YouthMatch. All rights reserved. Demo application with mock data.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;