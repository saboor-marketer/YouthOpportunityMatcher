import { CATEGORIES, LOCATIONS, MODES, EDUCATION_LEVELS } from '../data/skills';

const OpportunityFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Filters</h5>
        <div className="row g-3">
          <div className="col-md-6 col-lg-3">
            <label htmlFor="categoryFilter" className="form-label fw-semibold small">Category</label>
            <select
              id="categoryFilter"
              className="form-select"
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 col-lg-3">
            <label htmlFor="locationFilter" className="form-label fw-semibold small">Location</label>
            <select
              id="locationFilter"
              className="form-select"
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
            >
              <option value="">All Locations</option>
              {LOCATIONS.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 col-lg-3">
            <label htmlFor="modeFilter" className="form-label fw-semibold small">Mode</label>
            <select
              id="modeFilter"
              className="form-select"
              value={filters.mode}
              onChange={(e) => onFilterChange('mode', e.target.value)}
            >
              <option value="">All Modes</option>
              {MODES.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 col-lg-3">
            <label htmlFor="educationFilter" className="form-label fw-semibold small">Education Level</label>
            <select
              id="educationFilter"
              className="form-select"
              value={filters.educationLevel}
              onChange={(e) => onFilterChange('educationLevel', e.target.value)}
            >
              <option value="">All Levels</option>
              {EDUCATION_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6 col-lg-3">
            <label htmlFor="sortBy" className="form-label fw-semibold small">Sort By</label>
            <select
              id="sortBy"
              className="form-select"
              value={filters.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
            >
              <option value="bestMatch">Best Match</option>
              <option value="newest">Newest</option>
              <option value="deadline">Deadline</option>
              <option value="highestMatch">Highest Match</option>
            </select>
          </div>
          <div className="col-md-6 col-lg-3">
            <label htmlFor="minMatch" className="form-label fw-semibold small">Min Match Score</label>
            <select
              id="minMatch"
              className="form-select"
              value={filters.minMatch}
              onChange={(e) => onFilterChange('minMatch', e.target.value)}
            >
              <option value="0">Any Score</option>
              <option value="40">40%+</option>
              <option value="60">60%+</option>
              <option value="80">80%+</option>
            </select>
          </div>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => onFilterChange('reset', true)}
          >
            <i className="bi bi-arrow-counterclockwise me-1"></i>
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityFilters;