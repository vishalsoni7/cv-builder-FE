import axios from "axios";
import { BACKEND_BASE_URL } from "../constant/api";
import {
  UserApiResponse,
  UserLogInCredential,
  UserSignUpCredential,
} from "../types/user";

/**
 * Fetches the authenticated user's profile using the stored JWT token.
 * @param token - The JWT token received after login or signup.
 * @returns The user's profile data if the request is successful.
 * @throws An error if the request fails (e.g., invalid or expired token).
 */
export const fetchUserProfile = async (
  token: string
): Promise<UserApiResponse> => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
};

/**
 * Logs in the user and stores the token in localStorage
 * @param email - User's email
 * @param password - User's password
 * @returns The authenticated user data or an error
 */
export const loginUser = async ({ email, password }: UserLogInCredential) => {
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/login`, {
      email,
      password,
    });

    if (response.data) {
      localStorage.setItem("token", response.data.token); // Store token
      return response.data;
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

/**
 * Signs up a new user and stores the returned token in localStorage
 * @param userData - Object containing user details
 * @returns The authentication token or an error
 */
export const signUpUser = async (userData: UserSignUpCredential) => {
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/signup`, userData);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token); // Store token
      return response.data.token;
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

/**
 * Logs out the user by removing the token from localStorage
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
};
