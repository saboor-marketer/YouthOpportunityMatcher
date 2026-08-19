import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/skills';
import { OPPORTUNITIES } from '../data/opportunities';

const Home = () => {
  const featuredOpportunities = OPPORTUNITIES.slice(0, 3);

  return (
    <div>
      <section className="hero-section bg-primary text-white py-5 mb-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Find Opportunities That Match Your Potential</h1>
              <p className="lead mb-4">
                Discover scholarships, internships, training programs, competitions, freelance opportunities, and startup programs based on your skills and goals.
              </p>
              <div className="d-flex gap-3">
                <Link to="/opportunities" className="btn btn-light btn-lg text-primary fw-semibold">
                  Explore Opportunities
                </Link>
                <Link to="/profile" className="btn btn-outline-light btn-lg">
                  Build My Profile
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="text-center">
                <i className="bi bi-rocket-takeoff" style={{ fontSize: '200px', opacity: 0.3 }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 mb-5">
        <div className="container">
          <h2 className="text-center mb-5">Opportunity Categories</h2>
          <div className="row g-4">
            {CATEGORIES.map((category, index) => (
              <div key={category} className="col-md-4 col-sm-6">
                <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                  <div className="card-body text-center py-4">
                    <div className={`mb-3 text-primary`} style={{ fontSize: '2rem' }}>
                      {index === 0 && <i className="bi bi-mortarboard-fill"></i>}
                      {index === 1 && <i className="bi bi-briefcase-fill"></i>}
                      {index === 2 && <i className="bi bi-laptop-fill"></i>}
                      {index === 3 && <i className="bi bi-book-fill"></i>}
                      {index === 4 && <i className="bi bi-trophy-fill"></i>}
                      {index === 5 && <i className="bi bi-rocket-fill"></i>}
                    </div>
                    <h5 className="card-title">{category}</h5>
                    <Link to="/opportunities" className="btn btn-outline-primary btn-sm mt-3">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light mb-5">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-4 fw-bold">1</span>
                </div>
                <h5>Build Your Profile</h5>
                <p className="text-muted">Add your skills, education, interests, and career goals to help us find the best matches.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-4 fw-bold">2</span>
                </div>
                <h5>Discover Opportunities</h5>
                <p className="text-muted">Browse opportunities filtered by your profile with personalized match scores.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="fs-4 fw-bold">3</span>
                </div>
                <h5>Apply & Track</h5>
                <p className="text-muted">Save opportunities and track your application status all in one place.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 mb-5">
        <div className="container">
          <h2 className="text-center mb-5">Featured Opportunities</h2>
          <div className="row g-4">
            {featuredOpportunities.map(opportunity => (
              <div key={opportunity.id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <span className="badge bg-primary mb-2">{opportunity.category}</span>
                    <h5 className="card-title">{opportunity.title}</h5>
                    <p className="card-text text-muted small mb-3">{opportunity.organization}</p>
                    <p className="card-text small">{opportunity.description.substring(0, 100)}...</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {opportunity.location}
                      </small>
                      <Link to={`/opportunities/${opportunity.id}`} className="btn btn-sm btn-outline-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/opportunities" className="btn btn-primary">
              View All Opportunities
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5 bg-primary text-white mb-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 mb-4 mb-md-0">
              <div className="display-4 fw-bold">18+</div>
              <div>Opportunities</div>
            </div>
            <div className="col-md-3 mb-4 mb-md-0">
              <div className="display-4 fw-bold">6</div>
              <div>Categories</div>
            </div>
            <div className="col-md-3 mb-4 mb-md-0">
              <div className="display-4 fw-bold">100%</div>
              <div>Free to Use</div>
            </div>
            <div className="col-md-3">
              <div className="display-4 fw-bold">24/7</div>
              <div>Always Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Ready to Find Your Perfect Opportunity?</h2>
          <p className="lead mb-4 text-muted">
            Join thousands of students and young professionals who have discovered their path to success.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/opportunities" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link to="/profile" className="btn btn-outline-secondary btn-lg">
              Create Profile
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;