import { getMatchLabel, getMatchColor } from '../utils/helpers';

const MatchScore = ({ score }) => {
  const label = getMatchLabel(score);
  const color = getMatchColor(score);

  return (
    <div className="d-flex align-items-center">
      <span className={`badge bg-${color} me-2`}>{label}</span>
      <span className="fw-bold">{score}%</span>
    </div>
  );
};

export default MatchScore;