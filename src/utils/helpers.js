export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const getMatchLabel = (score) => {
  if (score >= 80) return 'Excellent Match';
  if (score >= 60) return 'Good Match';
  if (score >= 40) return 'Moderate Match';
  return 'Low Match';
};

export const getMatchColor = (score) => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'primary';
  if (score >= 40) return 'warning';
  return 'secondary';
};

export const calculateProfileCompletion = (profile) => {
  if (!profile) return 0;
  
  const fields = [
    profile.fullName,
    profile.email,
    profile.city,
    profile.country,
    profile.educationLevel,
    profile.fieldOfStudy,
    profile.institution,
    profile.graduationYear,
    profile.skills && profile.skills.length > 0,
    profile.interests && profile.interests.length > 0,
    profile.careerGoals && profile.careerGoals.length > 0
  ];
  
  const completedFields = fields.filter(field => field).length;
  return Math.round((completedFields / fields.length) * 100);
};