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

export const AuthPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signUp, isAuthenticated } = useUserContext();

  const handleSignUp = async (userData: UserSignUpCredential) => {
    await signUp(userData);
    handleClose();
    navigate(PATH.myTemplates);
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
                  sx={{ marginTop: 2, boxShadow: "none" ,  background: "radial-gradient(circle, #dd6b20, #cf3033)",}}
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
