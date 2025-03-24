import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CustomTextField } from "../component/CustomTextField";
import { Formik, Form } from "formik";
import { userSignUpInitialValues } from "../constant/initialValues";
import { CustomModal } from "../component/Modal";
import { UserSignUpCredential } from "../types/user";
import { userSignUpValidationSchema } from "../formik/user";
import { useUserContext } from "../store/UserStore";
import { PATH } from "../constant/paths";
import { errorToast, successToast } from "../utils/toast";
import {
  SIGN_UP_SUCCESS,
  SOMETHING_WENT_WRONG,
} from "../constant/toastMessages";

/**
 * AuthPage Component
 *
 * This component handles user authentication (sign-up) using a modal form.
 * - Displays a "Get Started" button, which opens a modal for sign-up.
 * - Uses Formik for form handling with validation via Yup.
 * - Redirects authenticated users to "My Templates".
 * - Uses the UserContext for authentication logic.
 */
export const AuthPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signUp, isAuthenticated } = useUserContext();

  const handleSignUp = async (userData: UserSignUpCredential) => {
    try {
      await signUp(userData);
      handleClose();
      navigate(PATH.myTemplates);
      successToast(SIGN_UP_SUCCESS);
    } catch (error) {
      errorToast(SOMETHING_WENT_WRONG || error);
    }
  };

  const handleModal = () => {
    if (isAuthenticated) {
      navigate(PATH.myTemplates);
    }

    handleOpen();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH.home);
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box>
      <Button
        onClick={handleModal}
        variant="contained"
        sx={{
          boxShadow: "none",
          marginTop: 4,
          marginBottom: 1,
          borderRadius: 0,
          background: "radial-gradient(circle, #dd6b20, #cf3033)",
        }}
      >
        {isAuthenticated ? `My Templates` : `Get Started`}
      </Button>
      <CustomModal open={open} handleClose={handleClose}>
        <>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center", fontWeight: 700 }}
          >
            Sign In
          </Typography>

          <Formik
            initialValues={userSignUpInitialValues}
            validationSchema={userSignUpValidationSchema}
            onSubmit={handleSignUp}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Stack direction="row" gap={2} mt={2}>
                  <CustomTextField
                    label="First Name"
                    name="firstName"
                    type="text"
                  />
                  <CustomTextField
                    label="Last Name"
                    name="lastName"
                    type="text"
                  />
                </Stack>

                <Stack direction="column" gap={2} mt={2}>
                  <CustomTextField label="Email" name="email" type="email" />
                  <CustomTextField
                    label="Password"
                    name="password"
                    type="password"
                  />
                </Stack>

                <Button
                  type="submit"
                  size="large"
                  fullWidth
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    boxShadow: "none",
                    background: "radial-gradient(circle, #dd6b20, #cf3033)",
                  }}
                >
                  Get in
                </Button>
              </Form>
            )}
          </Formik>
        </>
      </CustomModal>
    </Box>
  );
};
