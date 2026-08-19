import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { OPPORTUNITIES } from '../data/opportunities';
import { calculateMatchScore } from '../utils/matching';
import SearchBar from '../components/SearchBar';
import OpportunityFilters from '../components/OpportunityFilters';
import OpportunityCard from '../components/OpportunityCard';
import EmptyState from '../components/EmptyState';

const Opportunities = () => {
  const { profile } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    mode: '',
    educationLevel: '',
    sortBy: 'bestMatch',
    minMatch: '0'
  });

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        category: '',
        location: '',
        mode: '',
        educationLevel: '',
        sortBy: 'bestMatch',
        minMatch: '0'
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const filteredAndSortedOpportunities = useMemo(() => {
    let filtered = OPPORTUNITIES.filter(opp => {
      const matchScore = calculateMatchScore(opp, profile);
      
      if (filters.category && opp.category !== filters.category) return false;
      if (filters.location && opp.location !== filters.location) return false;
      if (filters.mode && opp.mode !== filters.mode) return false;
      if (filters.educationLevel && !opp.educationLevels.includes(filters.educationLevel)) return false;
      if (parseInt(filters.minMatch) > 0 && matchScore < parseInt(filters.minMatch)) return false;
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          opp.title,
          opp.organization,
          opp.description,
          opp.category,
          opp.location,
          ...opp.skills
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(query)) return false;
      }
      
      return true;
    });

    const sorted = filtered.map(opp => ({
      ...opp,
      matchScore: calculateMatchScore(opp, profile)
    }));

    switch (filters.sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
      case 'deadline':
        return sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      case 'highestMatch':
        return sorted.sort((a, b) => b.matchScore - a.matchScore);
      case 'bestMatch':
      default:
        return sorted.sort((a, b) => b.matchScore - a.matchScore);
    }
  }, [filters, searchQuery, profile]);

  return (
    <div className="container py-5">
      <h1 className="mb-4">Explore Opportunities</h1>
      <p className="text-muted mb-4">
        Discover {OPPORTUNITIES.length} opportunities tailored to your skills and goals.
      </p>

      <SearchBar onSearch={setSearchQuery} />
      <OpportunityFilters filters={filters} onFilterChange={handleFilterChange} />

      {filteredAndSortedOpportunities.length === 0 ? (
        <EmptyState
          icon="bi-search"
          title="No opportunities found"
          message="Try adjusting your filters or search terms to find more opportunities."
        />
      ) : (
        <>
          <p className="text-muted small mb-3">
            Showing {filteredAndSortedOpportunities.length} of {OPPORTUNITIES.length} opportunities
          </p>
          <div className="row g-4">
            {filteredAndSortedOpportunities.map(opportunity => (
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

export default Opportunities;