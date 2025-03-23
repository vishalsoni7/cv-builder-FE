import { ResumeInitialValue } from "../types/resume";
import { UserLogInCredential, UserSignUpCredential } from "../types/user";

export const userSignUpInitialValues: UserSignUpCredential = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const userLoginInitialValues: UserLogInCredential = {
  email: "",
  password: "",
};

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

export const guestCredentials: UserLogInCredential = {
  email: "rootent@gmail.com",
  password: "1234",
};
