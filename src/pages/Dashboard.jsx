import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { OPPORTUNITIES } from '../data/opportunities';
import { calculateMatchScore } from '../utils/matching';
import { calculateProfileCompletion } from '../utils/helpers';
import StatCard from '../components/StatCard';
import OpportunityCard from '../components/OpportunityCard';

const Dashboard = () => {
  const { profile, savedOpportunities, applications, getApplicationStatus } = useApp();

  const recommendedOpportunities = useMemo(() => {
    if (!profile) return [];
    
    const withScores = OPPORTUNITIES.map(opp => ({
      ...opp,
      matchScore: calculateMatchScore(opp, profile)
    }));
    
    return withScores
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 4);
  }, [profile]);

  const recentApplications = useMemo(() => {
    const applicationList = Object.entries(applications)
      .map(([opportunityId, data]) => {
        const opportunity = OPPORTUNITIES.find(opp => opp.id === parseInt(opportunityId));
        return opportunity ? { ...opportunity, ...data } : null;
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 5);
    
    return applicationList;
  }, [applications]);

  const profileCompletion = calculateProfileCompletion(profile);

  const getMissingFields = () => {
    if (!profile) return [];
    
    const missing = [];
    if (!profile.fullName) missing.push('Full Name');
    if (!profile.email) missing.push('Email');
    if (!profile.city) missing.push('City');
    if (!profile.country) missing.push('Country');
    if (!profile.educationLevel) missing.push('Education Level');
    if (!profile.fieldOfStudy) missing.push('Field of Study');
    if (!profile.institution) missing.push('Institution');
    if (!profile.graduationYear) missing.push('Graduation Year');
    if (!profile.skills || profile.skills.length === 0) missing.push('Skills');
    if (!profile.interests || profile.interests.length === 0) missing.push('Interests');
    if (!profile.careerGoals || profile.careerGoals.length === 0) missing.push('Career Goals');
    
    return missing;
  };

  const missingFields = getMissingFields();

  return (
    <div className="container py-5">
      <h1 className="mb-4">Dashboard</h1>
      
      <div className="row g-4 mb-5">
        <div className="col-md-3">
          <StatCard
            icon="bi-lightning-charge"
            title="Recommended"
            value={recommendedOpportunities.length}
            color="primary"
          />
        </div>
        <div className="col-md-3">
          <StatCard
            icon="bi-bookmark"
            title="Saved"
            value={savedOpportunities.length}
            color="warning"
          />
        </div>
        <div className="col-md-3">
          <StatCard
            icon="bi-file-earmark-check"
            title="Applications"
            value={Object.keys(applications).length}
            color="success"
          />
        </div>
        <div className="col-md-3">
          <StatCard
            icon="bi-person-check"
            title="Profile Complete"
            value={`${profileCompletion}%`}
            color="info"
          />
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="mb-4">Recommended Opportunities</h4>
              {recommendedOpportunities.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <i className="bi bi-person fs-1 mb-3 d-block"></i>
                  <p>Complete your profile to see personalized recommendations</p>
                  <Link to="/profile" className="btn btn-primary btn-sm">
                    Complete Profile
                  </Link>
                </div>
              ) : (
                <div className="row g-3">
                  {recommendedOpportunities.map(opportunity => (
                    <div key={opportunity.id} className="col-md-6">
                      <OpportunityCard 
                        opportunity={opportunity} 
                        matchScore={opportunity.matchScore}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="mb-4">Quick Actions</h4>
              <div className="d-grid gap-2">
                <Link to="/profile" className="btn btn-outline-primary">
                  <i className="bi bi-person me-2"></i>
                  Complete Profile
                </Link>
                <Link to="/opportunities" className="btn btn-outline-primary">
                  <i className="bi bi-search me-2"></i>
                  Explore Opportunities
                </Link>
                <Link to="/saved" className="btn btn-outline-primary">
                  <i className="bi bi-bookmark me-2"></i>
                  View Saved
                </Link>
                <Link to="/applications" className="btn btn-outline-primary">
                  <i className="bi bi-file-earmark-check me-2"></i>
                  Track Applications
                </Link>
              </div>
            </div>
          </div>

          {profileCompletion < 100 && (
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="mb-3">Profile Completion</h4>
                <div className="progress mb-3" style={{ height: '10px' }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${profileCompletion}%` }}
                    aria-valuenow={profileCompletion}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                {missingFields.length > 0 && (
                  <div>
                    <p className="small text-muted mb-2">Missing information:</p>
                    <ul className="small text-muted mb-3 ps-3">
                      {missingFields.slice(0, 5).map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                      {missingFields.length > 5 && (
                        <li>and {missingFields.length - 5} more...</li>
                      )}
                    </ul>
                    <Link to="/profile" className="btn btn-sm btn-primary">
                      Complete Profile
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h4 className="mb-4">Recent Application Activity</h4>
          {recentApplications.length === 0 ? (
            <div className="text-center py-4 text-muted">
              <i className="bi bi-inbox fs-1 mb-3 d-block"></i>
              <p>No applications yet. Start exploring opportunities!</p>
              <Link to="/opportunities" className="btn btn-primary btn-sm">
                Browse Opportunities
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Opportunity</th>
                    <th>Organization</th>
                    <th>Status</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {recentApplications.map(app => (
                    <tr key={app.id}>
                      <td>
                        <Link to={`/opportunities/${app.id}`} className="text-decoration-none">
                          {app.title}
                        </Link>
                      </td>
                      <td>{app.organization}</td>
                      <td>
                        <span className={`badge bg-${
                          app.status === 'Accepted' ? 'success' :
                          app.status === 'Rejected' ? 'danger' :
                          app.status === 'Interview' ? 'info' :
                          app.status === 'Under Review' ? 'warning' :
                          'secondary'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="text-muted small">
                        {new Date(app.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;