const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'success';
      case 'Rejected':
        return 'danger';
      case 'Interview':
        return 'info';
      case 'Under Review':
        return 'warning';
      case 'Applied':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  return (
    <span className={`badge bg-${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;