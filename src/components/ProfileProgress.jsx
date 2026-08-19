const ProfileProgress = ({ completion }) => {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between mb-2">
        <span className="fw-semibold">Profile Completion</span>
        <span className="fw-bold text-primary">{completion}%</span>
      </div>
      <div className="progress" style={{ height: '10px' }}>
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${completion}%` }}
          aria-valuenow={completion}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default ProfileProgress;