export const calculateMatchScore = (opportunity, profile) => {
  if (!profile) return 0;

  const weights = {
    skills: 0.40,
    interests: 0.20,
    education: 0.15,
    location: 0.10,
    careerGoals: 0.15
  };

  let skillsMatch = 0;
  if (profile.skills && profile.skills.length > 0 && opportunity.skills && opportunity.skills.length > 0) {
    const matchingSkills = opportunity.skills.filter(skill => profile.skills.includes(skill));
    skillsMatch = (matchingSkills.length / opportunity.skills.length) * 100;
  }

  let interestsMatch = 0;
  if (profile.interests && profile.interests.length > 0 && opportunity.interests && opportunity.interests.length > 0) {
    const matchingInterests = opportunity.interests.filter(interest => profile.interests.includes(interest));
    interestsMatch = (matchingInterests.length / opportunity.interests.length) * 100;
  }

  let educationMatch = 0;
  if (profile.educationLevel && opportunity.educationLevels && opportunity.educationLevels.length > 0) {
    educationMatch = opportunity.educationLevels.includes(profile.educationLevel) ? 100 : 0;
  }

  let locationMatch = 0;
  if (profile.city && opportunity.location) {
    const userLocation = profile.city.toLowerCase();
    const oppLocation = opportunity.location.toLowerCase();
    if (oppLocation.includes('remote') || oppLocation.includes(userLocation)) {
      locationMatch = 100;
    } else {
      locationMatch = 50;
    }
  }

  let careerGoalsMatch = 0;
  if (profile.careerGoals && profile.careerGoals.length > 0 && opportunity.careerGoals && opportunity.careerGoals.length > 0) {
    const matchingGoals = opportunity.careerGoals.filter(goal => profile.careerGoals.includes(goal));
    careerGoalsMatch = (matchingGoals.length / opportunity.careerGoals.length) * 100;
  }

  const finalScore = Math.round(
    skillsMatch * weights.skills +
    interestsMatch * weights.interests +
    educationMatch * weights.education +
    locationMatch * weights.location +
    careerGoalsMatch * weights.careerGoals
  );

  return Math.min(100, Math.max(0, finalScore));
};