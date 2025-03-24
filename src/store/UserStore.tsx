import { useState, useCallback, useEffect, useMemo } from "react";
import {
  UserLogInCredential,
  UserSignUpCredential,
  UserApiResponse,
  UserStoreType,
} from "../types/user";
import {
  fetchUserProfile,
  loginUser,
  logoutUser,
  signUpUser,
} from "../services/user";
import { createStoreContext } from "../context/StoreContext";
const useUserStore = (): UserStoreType => {
  const [user, setUser] = useState<UserApiResponse | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const isAuthenticated = !!token; // Derived state

  /**
   * Logs out the user
   */
  const logout = useCallback(() => {
    logoutUser();
    setToken(null);
    setUser(null);
  }, []);

  /**
   * Fetches the authenticated user's profile from the /me API.
   * If the token is valid, it updates the user state with the retrieved data.
   * If the request fails (e.g., invalid or expired token), it logs out the user.
   */
  const fetchUserDetails = useCallback(async () => {
    if (token) {
      try {
        const userData = await fetchUserProfile(token);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        logout(); // Logout if the token is invalid
      }
    }
  }, [token, logout]);

  // Load user data from localStorage on app start
  useEffect(() => {
    if (token) {
      fetchUserDetails();
    }
  }, [token, fetchUserDetails]);

  /**
   * Logs in the user
   */
  const login = useCallback(
    async (credentials: UserLogInCredential) => {
      const data = await loginUser(credentials);

      setToken(data.token);
      localStorage.setItem("token", data.token);

      await fetchUserDetails();
    },
    [fetchUserDetails]
  );

  /**
   * Signs up the user
   */
  const signUp = useCallback(
    async (userData: UserSignUpCredential) => {
      const newToken = await signUpUser(userData);

      setToken(newToken);
      localStorage.setItem("token", newToken);

      await fetchUserDetails();
    },
    [fetchUserDetails]
  );

  return useMemo(
    () => ({
      user,
      token,
      isAuthenticated,
      login,
      signUp,
      logout,
    }),
    [user, token, isAuthenticated, login, signUp, logout]
  );
};

// Create the context for UserStore
export const [UserProvider, useUserContext] =
  createStoreContext<UserStoreType>(useUserStore);
