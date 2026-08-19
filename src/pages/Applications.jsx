import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { OPPORTUNITIES } from '../data/opportunities';
import { calculateMatchScore } from '../utils/matching';
import { APPLICATION_STATUSES } from '../data/skills';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';

const Applications = () => {
  const { applications, profile, updateApplicationStatus, getApplicationStatus } = useApp();

  const applicationList = useMemo(() => {
    const list = Object.entries(applications)
      .map(([opportunityId, data]) => {
        const opportunity = OPPORTUNITIES.find(opp => opp.id === parseInt(opportunityId));
        if (!opportunity) return null;
        
        return {
          ...opportunity,
          ...data,
          matchScore: calculateMatchScore(opportunity, profile)
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    return list;
  }, [applications, profile]);

  const handleStatusChange = (opportunityId, newStatus) => {
    updateApplicationStatus(opportunityId, newStatus);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Application Tracker</h1>
      
      {applicationList.length === 0 ? (
        <EmptyState
          icon="bi-file-earmark-check"
          title="No applications yet"
          message="Start tracking your opportunity applications. When you mark an opportunity as applied, it will appear here."
        />
      ) : (
        <>
          <p className="text-muted mb-4">
            Tracking {applicationList.length} {applicationList.length === 1 ? 'application' : 'applications'}
          </p>
          
          <div className="row g-4">
            {applicationList.map(application => (
              <div key={application.id} className="col-lg-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <h5 className="card-title mb-1">{application.title}</h5>
                        <p className="card-text text-muted small mb-2">{application.organization}</p>
                        <div className="d-flex gap-2 small text-muted">
                          <span><i className="bi bi-geo-alt me-1"></i>{application.location}</span>
                          <span><i className="bi bi-laptop me-1"></i>{application.mode}</span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label small fw-semibold">Status</label>
                        <select
                          className="form-select form-select-sm"
                          value={application.status}
                          onChange={(e) => handleStatusChange(application.id, e.target.value)}
                        >
                          {APPLICATION_STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-3 text-md-end">
                        <div className="mb-2">
                          <StatusBadge status={application.status} />
                        </div>
                        <small className="text-muted">
                          Updated {new Date(application.updatedAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Applications;