import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import MatchScore from './MatchScore';
import { formatDate } from '../utils/helpers';

const OpportunityCard = ({ opportunity, matchScore }) => {
  const { savedOpportunities, toggleSaveOpportunity } = useApp();
  const isSaved = savedOpportunities.includes(opportunity.id);

  const handleSave = (e) => {
    e.preventDefault();
    toggleSaveOpportunity(opportunity.id);
  };

  return (
    <div className="card h-100 border-0 shadow-sm hover-shadow">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span className="badge bg-primary">{opportunity.category}</span>
          <MatchScore score={matchScore} />
        </div>
        <h5 className="card-title mb-2">{opportunity.title}</h5>
        <p className="card-text text-muted small mb-3">{opportunity.organization}</p>
        <p className="card-text small mb-3">{opportunity.description.substring(0, 120)}...</p>
        
        <div className="mb-3">
          <div className="d-flex flex-wrap gap-1">
            {opportunity.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="badge bg-light text-dark small">
                {skill}
              </span>
            ))}
            {opportunity.skills.length > 3 && (
              <span className="badge bg-light text-dark small">
                +{opportunity.skills.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="row g-2 small text-muted mb-3">
          <div className="col-6">
            <i className="bi bi-geo-alt me-1"></i>
            {opportunity.location}
          </div>
          <div className="col-6">
            <i className="bi bi-laptop me-1"></i>
            {opportunity.mode}
          </div>
          <div className="col-6">
            <i className="bi bi-calendar me-1"></i>
            {formatDate(opportunity.deadline)}
          </div>
        </div>

        <div className="d-flex gap-2 mt-auto">
          <Link
            to={`/opportunities/${opportunity.id}`}
            className="btn btn-primary flex-grow-1"
          >
            View Details
          </Link>
          <button
            className={`btn ${isSaved ? 'btn-warning' : 'btn-outline-secondary'}`}
            onClick={handleSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save opportunity'}
          >
            <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;