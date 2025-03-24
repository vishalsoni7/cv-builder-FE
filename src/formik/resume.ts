import * as Yup from "yup";
import { EMAIL_REGEX, PHONE_REGEX } from "../constant/regex";

// Validation schema for resume form using Yup
// Ensures that required fields are provided and meet specific criteria
export const resumeValidationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .matches(EMAIL_REGEX, "Invalid email format")
    .required("Email is required"),
  number: Yup.string()
    .matches(PHONE_REGEX, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  skills: Yup.array()
    .of(Yup.string().required("Each skill is required"))
    .min(1, "At least one skill is required"),
  designation: Yup.string().required("Designation is required"),
  projects: Yup.array()
    .of(Yup.string().required("Each project is required"))
    .min(1, "At least one project is required"),
  summary: Yup.string().required("Summary is required"),
  experience: Yup.array()
    .of(Yup.string().required("Each experience is required"))
    .min(1, "At least one experience is required"),
  education: Yup.array()
    .of(Yup.string().required("Each education entry is required"))
    .min(1, "At least one education entry is required"),
});
