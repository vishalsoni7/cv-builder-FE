import {
  Box,
  Toolbar,
  Avatar,
  Container,
  AppBar,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router";
import rootentLogo from "../assets/rootent.png";
import { CustomModal } from "./Modal";
import { Form, Formik } from "formik";
import { CustomTextField } from "./CustomTextField";
import { useEffect, useState } from "react";
import { guestCredentials, userLoginInitialValues } from "../constant/initialValues";
import { userLogInValidationSchema } from "../formik/user";
import { UserLogInCredential } from "../types/user";
import { useUserContext } from "../store/UserStore";
import { PATH } from "../constant/paths";

export const NavBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { login, logout, isAuthenticated } = useUserContext();

  const handleLogInOut = async () => {
    if (isAuthenticated) {
      logout();
      navigate(PATH.home);
    } else {
      handleOpen();
    }
  };

  const handleLogIn = async (values: UserLogInCredential) => {
    await login(values);
    handleClose();
    navigate(PATH.myTemplates);
  };

  const handleGuestLogin = async () => {
    await login(guestCredentials);
    handleClose();
    navigate(PATH.myTemplates);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH.home);
    }
  }, [isAuthenticated, navigate]);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "radial-gradient(circle, #dd6b20, #cf3033)",
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", alignItems: "center", gap: { xs: 2 } }}
        >
          <Box
            sx={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              cursor: "pointer",
            }}
          >
            <Avatar
              onClick={() => navigate("/")}
              variant="square"
              alt="Rootent"
              src={rootentLogo}
              sx={{
                padding: "8px 16px",
                width: { xs: "100px", sm: "144px" },
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              variant="text"
              onClick={handleLogInOut}
              sx={{
                color: "white",
              }}
            >
              {isAuthenticated ? `Log Out` : `Log In`}
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
                  initialValues={userLoginInitialValues}
                  validationSchema={userLogInValidationSchema}
                  onSubmit={handleLogIn}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <Stack direction="column" gap={2} mt={2}>
                        <CustomTextField
                          label="Email"
                          name="email"
                          type="email"
                        />
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
                          background:
                            "radial-gradient(circle, #dd6b20, #cf3033)",
                        }}
                      >
                        Log in
                      </Button>

                      <Button
                        size="small"
                        onClick={handleGuestLogin}
                        sx={{
                          display: "flex",
                          justifySelf: "center",
                          fontSize: "12px",
                          mt: 1,
                          color: "black",
                        }}
                      >
                        Guest Login
                      </Button>
                    </Form>
                  )}
                </Formik>
              </>
            </CustomModal>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
