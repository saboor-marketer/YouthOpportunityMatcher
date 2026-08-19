const EmptyState = ({ icon = 'bi-inbox', title, message }) => {
  return (
    <div className="text-center py-5">
      <div className="mb-4">
        <i className={`bi ${icon}`} style={{ fontSize: '4rem', color: '#dee2e6' }}></i>
      </div>
      <h3 className="text-muted mb-3">{title}</h3>
      <p className="text-muted">{message}</p>
    </div>
  );
};

export default EmptyState;