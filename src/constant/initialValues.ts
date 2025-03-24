import { ResumeInitialValue } from "../types/resume";
import { UserLogInCredential, UserSignUpCredential } from "../types/user";

// Initial values for user sign-up form
export const userSignUpInitialValues: UserSignUpCredential = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// Initial values for user login form
export const userLoginInitialValues: UserLogInCredential = {
  email: "",
  password: "",
};

// Initial values for a new resume
export const initialResumeValues: ResumeInitialValue = {
  fullName: "",
  email: "",
  number: "",
  skills: [],
  designation: "",
  projects: [],
  summary: "",
  experience: [],
  education: [],
  user: "",
};

// Predefined credentials for guest login
export const guestCredentials: UserLogInCredential = {
  email: "rootent@gmail.com",
  password: "1234",
};
