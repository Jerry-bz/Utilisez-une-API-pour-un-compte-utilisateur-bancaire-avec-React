import axios from "axios";

/**
 * Set the base URL for HTTP requests made by Axios.
 * @type {string}
 */
axios.defaults.baseURL = "http://localhost:3001/api/v1/user";

/**
 * Authenticate the user and return a token.
 * @param {string} mail - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} The user's authentication token.
 */
export const loginUser = async (mail, password) => {
  const response = await axios.post("/login", {
    email: mail,
    password: password,
  });

  return response.data.body.token;
};

/**
 * Get the user's profile data.
 * @returns {Promise<object>} The user's profile data.
 */
export const getUserProfile = async () => {
  const response = await axios.post("/profile");
  return response.data.body;
};

/**
 * Update the user's profile data.
 * @param {string} firstname - The user's first name.
 * @param {string} lastname - The user's last name.
 * @returns {Promise<object>} The updated user's profile data.
 */
export const updateUserProfile = async (firstname, lastname) => {
  return await axios.put("/profile", {
    firstName: firstname,
    lastName: lastname,
  });
};

/**
 * Set the authentication header for future HTTP requests.
 * @param {string} token - The user's authentication token.
 */

export const setAuthHeader = (token) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
};
