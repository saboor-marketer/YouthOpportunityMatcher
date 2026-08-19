import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, saveProfile, getSavedOpportunities, saveSavedOpportunities, getApplications, saveApplications } from '../utils/storage';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [savedOpportunities, setSavedOpportunities] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadedProfile = getProfile();
    const loadedSaved = getSavedOpportunities();
    const loadedApplications = getApplications();
    
    setProfile(loadedProfile);
    setSavedOpportunities(loadedSaved);
    setApplications(loadedApplications);
  }, []);

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
  };

  const toggleSaveOpportunity = (opportunityId) => {
    let newSaved;
    if (savedOpportunities.includes(opportunityId)) {
      newSaved = savedOpportunities.filter(id => id !== opportunityId);
    } else {
      newSaved = [...savedOpportunities, opportunityId];
    }
    setSavedOpportunities(newSaved);
    saveSavedOpportunities(newSaved);
  };

  const updateApplicationStatus = (opportunityId, status) => {
    const newApplications = {
      ...applications,
      [opportunityId]: { status, updatedAt: new Date().toISOString() }
    };
    setApplications(newApplications);
    saveApplications(newApplications);
  };

  const getApplicationStatus = (opportunityId) => {
    return applications[opportunityId]?.status || null;
  };

  return (
    <AppContext.Provider value={{
      profile,
      updateProfile,
      savedOpportunities,
      toggleSaveOpportunity,
      applications,
      updateApplicationStatus,
      getApplicationStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};