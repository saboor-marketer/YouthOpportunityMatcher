import { useApp } from '../context/AppContext';
import { OPPORTUNITIES } from '../data/opportunities';
import { calculateMatchScore } from '../utils/matching';
import OpportunityCard from '../components/OpportunityCard';
import EmptyState from '../components/EmptyState';

const SavedOpportunities = () => {
  const { savedOpportunities, profile } = useApp();

  const savedOpportunitiesList = OPPORTUNITIES.filter(opp => 
    savedOpportunities.includes(opp.id)
  ).map(opp => ({
    ...opp,
    matchScore: calculateMatchScore(opp, profile)
  }));

  return (
    <div className="container py-5">
      <h1 className="mb-4">Saved Opportunities</h1>
      
      {savedOpportunitiesList.length === 0 ? (
        <EmptyState
          icon="bi-bookmark"
          title="No saved opportunities"
          message="Start exploring and save opportunities that interest you. They'll appear here for easy access."
        />
      ) : (
        <>
          <p className="text-muted mb-4">
            You have {savedOpportunitiesList.length} saved {savedOpportunitiesList.length === 1 ? 'opportunity' : 'opportunities'}
          </p>
          <div className="row g-4">
            {savedOpportunitiesList.map(opportunity => (
              <div key={opportunity.id} className="col-md-6 col-lg-4">
                <OpportunityCard 
                  opportunity={opportunity} 
                  matchScore={opportunity.matchScore}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SavedOpportunities;