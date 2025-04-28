import validator from "validator";



// Validate email format
export const validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email format');
  }
};

// Validate password (must be at least 8 characters long)
export const validatePassword = (password) => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
};

// Validate if a string is not empty
 export const validateNonEmptyString = (str, fieldName) => {
  if (!str || str.trim().length === 0) {
    throw new Error(`${fieldName} cannot be empty`);
  }
};

// Validate job details (e.g., title, description, skills)
export const validateJobDetails = (jobDetails) => {
  const { title, description, skillsRequired, location } = jobDetails;
  
  validateNonEmptyString(title, 'Job title');
  validateNonEmptyString(description, 'Job description');
  if (!Array.isArray(skillsRequired) || skillsRequired.length === 0) {
    throw new Error('At least one skill is required');
  }
  validateNonEmptyString(location, 'Job location');
};

module.exports = {
  validateEmail,
  validatePassword,
  validateNonEmptyString,
  validateJobDetails,
};
