import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import { useResumeContext } from "../store/ResumeStore";
import { PATH } from "../constant/paths";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePreview from "../component/ResumePreview";
import { ResumeInitialValue } from "../types/resume";
import { useEffect, useState } from "react";
import { initialResumeValues } from "../constant/initialValues";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { resumes, deleteResumeById, fetchResumeById } = useResumeContext();

  const [selectedResume, setSelectedResume] =
    useState<ResumeInitialValue>(initialResumeValues);

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) return;

      try {
        const resumeData = await fetchResumeById(id);
        setSelectedResume(resumeData);
      } catch (err: any) {
        console.error(err.message || "Failed to fetch resume");
      }
    };

    fetchResume();
  }, [id, fetchResumeById]);

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
            padding: "72px",
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
              px: 3,
              py: 2,
              width: "auto",
              height: "auto",
            }}
            key={resume._id}
          >
            <Stack direction="column" width="100%" gap={3}>
              <Stack gap={2} sx={{ display: "flex", alignItems: "center" }}>
                <PictureAsPdfIcon sx={{ height: 34, width: 34 }} />
                <Typography sx={{ wordWrap: "break-word" }} variant="body1">
                  {resume.fullName}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                width="100%"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <PDFDownloadLink
                  document={<ResumePreview resume={selectedResume} />}
                  fileName={selectedResume.fullName}
                  style={{
                    textDecoration: "none",
                    height: "100%",
                  }}
                >
                  {() => (
                    <IconButton>
                      <ArrowCircleDownIcon sx={{ height: 28, width: 28 }} />
                    </IconButton>
                  )}
                </PDFDownloadLink>

                <IconButton
                  onClick={() => resume._id && deleteResumeById(resume._id)}
                >
                  <DeleteIcon />
                </IconButton>

                <IconButton
                  onClick={() =>
                    resume._id && navigate(`/resume/${resume._id}`)
                  }
                >
                  <EditIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ResumeBuilder;
