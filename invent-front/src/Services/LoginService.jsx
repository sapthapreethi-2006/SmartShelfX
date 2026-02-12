import axios from 'axios';
const BASE_URL = 'http://localhost:9191/invent';
const LOGIN_URL = BASE_URL + '/login';
const REGISTER_URL = BASE_URL + '/register';

// Login user with username and password - returns role
export const loginUser = (username, password) => {
  console.log('Attempting login to:', LOGIN_URL);
  console.log('Username:', username);
  return axios.post(LOGIN_URL, { username, password })
    .then(response => {
      console.log('Login response:', response);
      return response;
    })
    .catch(error => {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: LOGIN_URL
      });
      throw error;
    });
};

// Register new user
export const registerUser = (userData) => {
  console.log('Attempting registration to:', REGISTER_URL);
  console.log('User data:', userData);
  return axios.post(REGISTER_URL, userData)
    .then(response => {
      console.log('Registration response:', response);
      return response;
    })
    .catch(error => {
      console.error('Registration error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: REGISTER_URL
      });
      throw error;
    });
};

// For pulling from the db and validating
export const validateUser = (userId, password) => {
  return axios.get(LOGIN_URL + "/" + userId + "/" + password);
};

// Get all users (used by Show User Details)
// Tries common endpoints since backend may expose users differently
export const getUserDetails = async (username) => {
  // Preferred conventional endpoint
  const candidates = [
    `${BASE_URL}/user/${username}`,
    `${BASE_URL}/users/${username}`,
    `${BASE_URL}/user/details/${username}`,
  ];

  let lastError;
  for (const url of candidates) {
    try {
      console.log('Attempting to fetch user from:', url);
      const res = await axios.get(url);
      return res; // return on first success
    } catch (err) {
      lastError = err;
      console.warn('Fetch user failed for', url, err?.response?.status);
    }
  }
  throw lastError || new Error('User endpoint not reachable');
};

// Fetch all registered users (fallback for details lookup)
export const getRegisteredUsers = async () => {
  const listCandidates = [
    REGISTER_URL,            // many backends return list on GET /register
    `${BASE_URL}/users`,     // conventional list endpoint
  ];

  let lastError;
  for (const url of listCandidates) {
    try {
      console.log('Attempting to fetch users list from:', url);
      const res = await axios.get(url);
      // Expect an array of users
      if (Array.isArray(res.data)) {
        return res.data;
      }
      // Some servers may wrap in an object
      if (res.data && Array.isArray(res.data.users)) {
        return res.data.users;
      }
      // If a single object is returned, normalize to array
      return [res.data];
    } catch (err) {
      lastError = err;
      console.warn('Fetch users list failed for', url, err?.response?.status);
    }
  }
  throw lastError || new Error('Users list endpoint not reachable');
};

// Find a user by username; prefer direct endpoint then fallback to list
export const findUserByUsername = async (username) => {
  const directUrl = `${BASE_URL}/user/${username}`;
  try {
    // Try direct user endpoint first
    const res = await axios.get(directUrl);
    return res?.data || null;
  } catch (directErr) {
    console.warn('Direct lookup failed:', directUrl, directErr?.response?.status);
    try {
      // Fallback to listing and filtering
      const users = await getRegisteredUsers();
      const lower = (username || '').toLowerCase();
      const found = users.find(u =>
        (u.username && u.username.toLowerCase() === lower) ||
        (u.userId && String(u.userId).toLowerCase() === lower)
      );
      return found || null;
    } catch (listErr) {
      console.error('Error finding user by username:', listErr);
      return null;
    }
  }
};