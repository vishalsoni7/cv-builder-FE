import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useResumeContext } from "../store/ResumeStore";
import { PATH } from "../constant/paths";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePreview from "../component/ResumePreview";
import { errorToast, successToast } from "../utils/toast";
import {
  DELETE_RESUME_SUCCESS,
  SOMETHING_WENT_WRONG,
} from "../constant/toastMessages";

/**
 * ResumeBuilder Component
 *
 * Displays a list of user resumes with options to create, edit, delete, and download as PDF.
 * Uses Material-UI for styling and `PDFDownloadLink` for exporting resumes.
 * Allows navigation to resume creation and editing pages.
 */
const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { resumes, deleteResumeById } = useResumeContext();

  const handleDeleteResume = (resumeId?: string) => {
    if (resumeId) {
      deleteResumeById(resumeId);
      successToast(DELETE_RESUME_SUCCESS);
    } else {
      errorToast(SOMETHING_WENT_WRONG);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" my={2}>
        My Resume List
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: 2,
          py: 2,
        }}
      >
        <IconButton
          sx={{
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            borderRadius: 2,
            padding: "70px",
            aspectRatio: 1,
          }}
          onClick={() => navigate(PATH.template)}
        >
          <AddIcon />
        </IconButton>

        {resumes?.map((resume) => (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              borderRadius: 2,
              width: "100%",
              maxWidth: "150px",
            }}
            key={resume._id}
          >
            <Stack
              direction="column"
              width="100%"
              gap={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                direction="row"
                width="100%"
                justifyContent="flex-end"
                alignItems="center"
              >
                <IconButton
                  size="small"
                  onClick={() => handleDeleteResume(resume._id)}
                >
                  <DeleteIcon />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() =>
                    resume._id && navigate(`/resume/${resume._id}`)
                  }
                >
                  <EditIcon />
                </IconButton>
              </Stack>

              <Stack direction="column" alignItems="center" gap={1}>
                <PictureAsPdfIcon sx={{ height: 40, width: 40 }} />

                <Typography
                  sx={{ wordWrap: "break-word", fontSize: "small" }}
                  variant="body1"
                >
                  {resume.fullName}
                </Typography>
              </Stack>

              <PDFDownloadLink
                document={<ResumePreview resume={resume} />}
                fileName={`${resume.fullName}.pdf`}
                style={{
                  textDecoration: "none",
                  height: "100%",
                }}
              >
                <IconButton size="small">
                  <ArrowCircleDownIcon />
                </IconButton>
              </PDFDownloadLink>
            </Stack>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ResumeBuilder;
