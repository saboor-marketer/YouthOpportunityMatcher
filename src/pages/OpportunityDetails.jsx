import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { OPPORTUNITIES } from '../data/opportunities';
import { calculateMatchScore } from '../utils/matching';
import { formatDate, getMatchLabel, getMatchColor } from '../utils/helpers';
import MatchScore from '../components/MatchScore';
import StatusBadge from '../components/StatusBadge';

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, savedOpportunities, toggleSaveOpportunity, applications, updateApplicationStatus, getApplicationStatus } = useApp();
  
  const opportunity = OPPORTUNITIES.find(opp => opp.id === parseInt(id));
  
  if (!opportunity) {
    return (
      <div className="container py-5 text-center">
        <h1 className="mb-4">Opportunity Not Found</h1>
        <p className="text-muted mb-4">The opportunity you're looking for doesn't exist.</p>
        <Link to="/opportunities" className="btn btn-primary">
          Browse Opportunities
        </Link>
      </div>
    );
  }

  const matchScore = calculateMatchScore(opportunity, profile);
  const isSaved = savedOpportunities.includes(opportunity.id);
  const applicationStatus = getApplicationStatus(opportunity.id);

  const handleSave = () => {
    toggleSaveOpportunity(opportunity.id);
  };

  const handleStatusChange = (newStatus) => {
    updateApplicationStatus(opportunity.id, newStatus);
  };

  const getMatchExplanation = () => {
    if (!profile) return 'Complete your profile to see detailed match information.';
    
    const explanations = [];
    
    if (profile.skills && profile.skills.length > 0) {
      const matchingSkills = opportunity.skills.filter(skill => profile.skills.includes(skill));
      if (matchingSkills.length > 0) {
        explanations.push(`You have ${matchingSkills.length} matching skills: ${matchingSkills.join(', ')}`);
      }
    }
    
    if (profile.interests && profile.interests.length > 0) {
      const matchingInterests = opportunity.interests.filter(interest => profile.interests.includes(interest));
      if (matchingInterests.length > 0) {
        explanations.push(`Your interests align: ${matchingInterests.join(', ')}`);
      }
    }
    
    if (profile.educationLevel && opportunity.educationLevels.includes(profile.educationLevel)) {
      explanations.push(`Your education level matches the requirements`);
    }
    
    if (profile.city && opportunity.location.toLowerCase().includes(profile.city.toLowerCase())) {
      explanations.push(`Location matches your preference`);
    }
    
    if (explanations.length === 0) {
      return 'Complete your profile to improve your match score';
    }
    
    return explanations.join('. ');
  };

  return (
    <div className="container py-5">
      <button 
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Back
      </button>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="badge bg-primary mb-2">{opportunity.category}</span>
                  <h1 className="mb-2">{opportunity.title}</h1>
                  <p className="text-muted fs-5">{opportunity.organization}</p>
                </div>
                <MatchScore score={matchScore} />
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-geo-alt text-primary me-2"></i>
                    <div>
                      <small className="text-muted d-block">Location</small>
                      <span className="fw-semibold">{opportunity.location}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-laptop text-primary me-2"></i>
                    <div>
                      <small className="text-muted d-block">Mode</small>
                      <span className="fw-semibold">{opportunity.mode}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-calendar text-primary me-2"></i>
                    <div>
                      <small className="text-muted d-block">Deadline</small>
                      <span className="fw-semibold">{formatDate(opportunity.deadline)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Description</h4>
              <p className="text-muted">{opportunity.description}</p>

              <h4 className="mb-3 mt-4">Eligibility</h4>
              <ul className="text-muted">
                {opportunity.eligibility.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h4 className="mb-3 mt-4">Required Skills</h4>
              <div className="d-flex flex-wrap gap-2">
                {opportunity.skills.map((skill, index) => (
                  <span key={index} className="badge bg-light text-dark">
                    {skill}
                  </span>
                ))}
              </div>

              <h4 className="mb-3 mt-4">Benefits</h4>
              <ul className="text-muted">
                {opportunity.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>

              <h4 className="mb-3 mt-4">Application Process</h4>
              <p className="text-muted">Click the application button below to proceed with your application. Make sure you meet all eligibility requirements before applying.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="mb-3">Why This Matches You</h4>
              <div className={`alert alert-${getMatchColor(matchScore)}`}>
                <strong>{getMatchLabel(matchScore)}</strong> - {matchScore}% match
              </div>
              <p className="text-muted small">{getMatchExplanation()}</p>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="mb-3">Application Status</h4>
              <div className="mb-3">
                <label className="form-label small fw-semibold">Current Status</label>
                {applicationStatus ? (
                  <div className="mb-3">
                    <StatusBadge status={applicationStatus} />
                  </div>
                ) : (
                  <p className="text-muted small">Not started</p>
                )}
                <select
                  className="form-select"
                  value={applicationStatus || 'Interested'}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="Interested">Interested</option>
                  <option value="Applied">Applied</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Interview">Interview</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-grid gap-2">
                <button
                  className={`btn ${isSaved ? 'btn-warning' : 'btn-outline-primary'} btn-lg`}
                  onClick={handleSave}
                >
                  <i className={`bi ${isSaved ? 'bi-bookmark-fill' : 'bi-bookmark'} me-2`}></i>
                  {isSaved ? 'Remove from Saved' : 'Save Opportunity'}
                </button>
                <a
                  href={opportunity.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                >
                  <i className="bi bi-box-arrow-up-right me-2"></i>
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;