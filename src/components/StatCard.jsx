const StatCard = ({ icon, title, value, color = 'primary' }) => {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className={`bg-${color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3`} style={{ width: '50px', height: '50px' }}>
            <i className={`bi ${icon} text-${color} fs-4`}></i>
          </div>
          <div>
            <h6 className="card-subtitle text-muted mb-1">{title}</h6>
            <h3 className="card-title mb-0 fw-bold">{value}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;