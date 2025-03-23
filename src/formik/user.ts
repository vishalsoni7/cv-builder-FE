import * as Yup from "yup";
import { UserLogInCredential, UserSignUpCredential } from "../types/user";

export const userSignUpValidationSchema: Yup.ObjectSchema<UserSignUpCredential> =
  Yup.object().shape({
    firstName: Yup.string().required("first name is a required field!"),
    lastName: Yup.string().required("last name is a required field!"),
    email: Yup.string().required("email is a required field!"),
    password: Yup.string().required("password is a required field!"),
  });

export const userLogInValidationSchema: Yup.ObjectSchema<UserLogInCredential> =
  Yup.object().shape({
    email: Yup.string().required("email is a required field!"),
    password: Yup.string().required("password is a required field!"),
  });
