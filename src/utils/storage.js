const STORAGE_KEYS = {
  PROFILE: 'youthmatch_profile',
  SAVED_OPPORTUNITIES: 'youthmatch_saved',
  APPLICATIONS: 'youthmatch_applications'
};

const safeGet = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    return defaultValue;
  }
};

const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getProfile = () => {
  return safeGet(STORAGE_KEYS.PROFILE, null);
};

export const saveProfile = (profile) => {
  safeSet(STORAGE_KEYS.PROFILE, profile);
};

export const getSavedOpportunities = () => {
  return safeGet(STORAGE_KEYS.SAVED_OPPORTUNITIES, []);
};

export const saveSavedOpportunities = (saved) => {
  safeSet(STORAGE_KEYS.SAVED_OPPORTUNITIES, saved);
};

export const getApplications = () => {
  return safeGet(STORAGE_KEYS.APPLICATIONS, {});
};

export const saveApplications = (applications) => {
  safeSet(STORAGE_KEYS.APPLICATIONS, applications);
};