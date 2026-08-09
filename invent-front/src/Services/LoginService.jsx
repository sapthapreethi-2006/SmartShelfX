import axios from 'axios';

const BASE_URL = 'https://smartshelfx-backend-vh6n.onrender.com/invent';

const LOGIN_URL = `${BASE_URL}/login`;
const REGISTER_URL = `${BASE_URL}/register`;

// Login user
export const loginUser = async (username, password) => {
  try {
    console.log('Attempting login to:', LOGIN_URL);

    const response = await axios.post(LOGIN_URL, {
      username,
      password
    });

    console.log('Login response:', response);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register new user
export const registerUser = async (userData) => {
  try {
    console.log('Attempting registration to:', REGISTER_URL);

    const response = await axios.post(REGISTER_URL, userData);

    console.log('Registration response:', response);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Validate user
export const validateUser = async (userId, password) => {
  return axios.get(`${LOGIN_URL}/${userId}/${password}`);
};

// Get user details
export const getUserDetails = async (username) => {
  const candidates = [
    `${BASE_URL}/user/${username}`,
    `${BASE_URL}/users/${username}`,
    `${BASE_URL}/user/details/${username}`
  ];

  let lastError;

  for (const url of candidates) {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('User endpoint not reachable');
};

// Get all registered users
export const getRegisteredUsers = async () => {
  const candidates = [
    REGISTER_URL,
    `${BASE_URL}/users`
  ];

  let lastError;

  for (const url of candidates) {
    try {
      const response = await axios.get(url);

      if (Array.isArray(response.data)) {
        return response.data;
      }

      if (response.data && Array.isArray(response.data.users)) {
        return response.data.users;
      }

      return [response.data];
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Users list endpoint not reachable');
};

// Find user by username
export const findUserByUsername = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${username}`);
    return response.data || null;
  } catch (error) {
    console.warn('Direct user lookup failed:', error?.response?.status);

    try {
      const users = await getRegisteredUsers();
      const lower = (username || '').toLowerCase();

      return (
        users.find(
          user =>
            (user.username &&
              user.username.toLowerCase() === lower) ||
            (user.userId &&
              String(user.userId).toLowerCase() === lower)
        ) || null
      );
    } catch (listError) {
      console.error('Error finding user:', listError);
      return null;
    }
  }
};
