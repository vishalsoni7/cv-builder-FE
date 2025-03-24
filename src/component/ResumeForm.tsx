import { Button, Container, Grid2, Stack } from "@mui/material";
import { CustomTextField } from "./CustomTextField";
import { Form, Formik } from "formik";
import { resumeValidationSchema } from "../formik/resume";
import { useResumeContext } from "../store/ResumeStore";
import { useNavigate, useParams } from "react-router-dom";
import { PATH } from "../constant/paths";
import { ResumeDocumentProps, ResumeInitialValue } from "../types/resume";
import ResumePreview from "./ResumePreview";
import { errorToast, successToast } from "../utils/toast";
import {
  CREATE_RESUME_SUCCESS,
  SOMETHING_WENT_WRONG,
  UPDATE_RESUME_SUCCESS,
} from "../constant/toastMessages";

const ResumeForm = ({ resume }: ResumeDocumentProps) => {
  const { createResume, updateResumeById } = useResumeContext();
  const navigate = useNavigate();
  const { id } = useParams();

  // Destructure resume data or set default values
  const {
    fullName,
    designation,
    email,
    number,
    summary,
    projects,
    skills,
    experience,
    education,
    user,
  } = resume;

  // Initialize form values with existing resume data or default values
  const resumeInitialValue: ResumeInitialValue = {
    fullName: fullName ?? "",
    designation: designation ?? "",
    email: email ?? "",
    number: number ?? 0,
    summary: summary ?? [],
    projects: projects ?? [],
    skills: skills ?? [],
    experience: experience ?? [],
    education: education ?? [],
    user: user ?? "",
  };

  // Handle form submission
  const handleResume = async (values: ResumeInitialValue) => {
    try {
      if (id) {
        await updateResumeById(id, values);
        successToast(UPDATE_RESUME_SUCCESS);
      } else {
        await createResume(values);
        successToast(CREATE_RESUME_SUCCESS);
      }
    } catch (error) {
      errorToast(SOMETHING_WENT_WRONG || error);
    } finally {
      navigate(PATH.myTemplates);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: 1,
        background: "white",
      }}
    >
      <Grid2
        maxWidth="lg"
        container
        rowSpacing={2}
        columnSpacing={4}
        sx={{
          padding: 2,
          width: "100%",
          justifySelf: "center",
        }}
      >
        <Formik
          initialValues={resumeInitialValue}
          onSubmit={handleResume}
          validationSchema={resumeValidationSchema}
          enableReinitialize
        >
          {({ handleSubmit, values }) => (
            <>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Form onSubmit={handleSubmit}>
                  <Stack
                    direction="row"
                    spacing={2}
                    mt={2}
                    mb={2}
                    alignItems="center"
                  >
                    <CustomTextField
                      label="Full Name"
                      type="text"
                      name="fullName"
                    />{" "}
                    <CustomTextField
                      label="Designation"
                      type="text"
                      name="designation"
                    />
                  </Stack>
                  <Stack direction="row" spacing={2} mt={2} mb={2}>
                    <CustomTextField label="Email" type="email" name="email" />
                    <CustomTextField
                      label="Number"
                      type="number"
                      name="number"
                    />{" "}
                  </Stack>

                  <CustomTextField label="Summary" type="text" name="summary" />
                  <Stack direction="row" spacing={2} mt={2} mb={2}>
                    <CustomTextField
                      label="Projects"
                      type="text"
                      name="projects"
                    />
                  </Stack>

                  <Stack direction="row" spacing={2} mt={2} mb={2}>
                    <CustomTextField label="Skills" type="text" name="skills" />
                  </Stack>

                  <Stack direction="row" spacing={2} mt={2} mb={2}>
                    <CustomTextField
                      label="Experience"
                      type="text"
                      name="experience"
                      multiline
                      rows={4}
                    />
                    <CustomTextField
                      multiline
                      rows={4}
                      label="Education"
                      type="text"
                      name="education"
                    />
                  </Stack>
                  <Button
                    color="warning"
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ boxShadow: "none" }}
                  >
                    {id ? `Update Resume` : `Save Resume`}
                  </Button>
                </Form>
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <ResumePreview resume={values} />
              </Grid2>
            </>
          )}
        </Formik>
      </Grid2>
    </Container>
  );
};

export default ResumeForm;
