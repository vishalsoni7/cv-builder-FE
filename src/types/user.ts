export interface UserLogInCredential {
  email: string;
  password: string;
}

export interface UserSignUpCredential extends UserLogInCredential {
  firstName: string;
  lastName: string;
}

export interface UserApiResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  resumes: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * User Store Type Definition
 */
export interface UserStoreType {
  user: UserApiResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: UserLogInCredential) => Promise<void>;
  signUp: (userData: UserSignUpCredential) => Promise<void>;
  logout: () => void;
}
