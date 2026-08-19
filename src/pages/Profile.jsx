import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SKILLS, INTERESTS, CAREER_GOALS, EDUCATION_LEVELS } from '../data/skills';
import { calculateProfileCompletion } from '../utils/helpers';
import ProfileProgress from '../components/ProfileProgress';

const Profile = () => {
  const { profile, updateProfile } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    city: '',
    country: '',
    educationLevel: '',
    fieldOfStudy: '',
    institution: '',
    graduationYear: '',
    skills: [],
    interests: [],
    careerGoals: []
  });

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  const completion = calculateProfileCompletion(formData);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="mb-4">My Profile</h1>
          
          <ProfileProgress completion={completion} />

          <form onSubmit={handleSubmit} className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="mb-4">Personal Information</h4>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="country" className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h4 className="mb-4">Education</h4>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label htmlFor="educationLevel" className="form-label">Education Level</label>
                  <select
                    className="form-select"
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                  >
                    <option value="">Select level</option>
                    {EDUCATION_LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="fieldOfStudy" className="form-label">Field of Study</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fieldOfStudy"
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="institution" className="form-label">Institution</label>
                  <input
                    type="text"
                    className="form-control"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="graduationYear" className="form-label">Graduation Year</label>
                  <input
                    type="number"
                    className="form-control"
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    min="2000"
                    max="2030"
                  />
                </div>
              </div>

              <h4 className="mb-4">Skills</h4>
              <div className="mb-4">
                <div className="row g-2">
                  {SKILLS.map(skill => (
                    <div key={skill} className="col-md-4 col-sm-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`skill-${skill}`}
                          checked={formData.skills.includes(skill)}
                          onChange={() => handleMultiSelect('skills', skill)}
                        />
                        <label className="form-check-label" htmlFor={`skill-${skill}`}>
                          {skill}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h4 className="mb-4">Interests</h4>
              <div className="mb-4">
                <div className="row g-2">
                  {INTERESTS.map(interest => (
                    <div key={interest} className="col-md-4 col-sm-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`interest-${interest}`}
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleMultiSelect('interests', interest)}
                        />
                        <label className="form-check-label" htmlFor={`interest-${interest}`}>
                          {interest}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h4 className="mb-4">Career Goals</h4>
              <div className="mb-4">
                <div className="row g-2">
                  {CAREER_GOALS.map(goal => (
                    <div key={goal} className="col-md-4 col-sm-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`goal-${goal}`}
                          checked={formData.careerGoals.includes(goal)}
                          onChange={() => handleMultiSelect('careerGoals', goal)}
                        />
                        <label className="form-check-label" htmlFor={`goal-${goal}`}>
                          {goal}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  Save Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;