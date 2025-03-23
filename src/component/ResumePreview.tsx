import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";
import { Box, Divider, Grid2 } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import WorkIcon from "@mui/icons-material/Work";
import EmailIcon from "@mui/icons-material/Email";
import { ResumeInitialValue } from "../types/resume";

export interface ResumeDocumentProps {
  resume: ResumeInitialValue;
}

const ResumePreview = ({ resume }: ResumeDocumentProps) => {
  if (!resume) return <Text>No resume data available.</Text>;

  return (
    <Document style={{ height: "100%", display: "flex" }}>
      <Page style={styles.body}>
        <Grid2
          maxWidth="lg"
          container
          rowSpacing={1}
          columnSpacing={2}
          sx={{
            padding: 0,
            justifySelf: "center",
          }}
        >
          <Grid2 size={12}>
            <Text style={styles.title}>{resume?.fullName}</Text>
          </Grid2>

          <Grid2
            size={12}
            spacing={1}
            mb={2}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            height="100%"
            gap={3}
          >
            <Box>
              <CallIcon />
              <Text style={styles.text}>{resume?.number}</Text>
            </Box>
            <WorkIcon />
            <Text style={styles.text}>{resume.designation}</Text>
            <EmailIcon /> <Text style={styles.text}>{resume?.email}</Text>
          </Grid2>

          <Grid2 size={8}>
            <Text style={styles.subtitle}>Summary</Text>
            <Divider sx={{ marginY: 0.5 }} />
            <Text style={styles.text}>{resume?.summary}</Text>
          </Grid2>

          <Grid2 size={4}>
            <Text style={styles.subtitle}>Skills</Text>
            <Divider sx={{ marginY: 0.5 }} />
            <Text style={styles.text}>{resume?.skills?.join(", ")}</Text>
          </Grid2>

          <Grid2 size={8}>
            <Text style={styles.subtitle}>Experience</Text>
            <Divider sx={{ marginY: 0.5 }} />
            <Text style={styles.text}>{resume?.experience?.join(", ")}</Text>
          </Grid2>

          <Grid2 size={4}>
            <Text style={styles.subtitle}>Projects</Text>
            <Divider sx={{ marginY: 0.5 }} />
            <Text style={styles.text}>{resume?.projects?.join(", ")}</Text>
          </Grid2>

          <Grid2 size={8}>
            <Text style={styles.subtitle}>Education</Text>
            <Divider sx={{ marginY: 0.5 }} />
            <Text style={styles.text}>{resume?.education?.join(", ")}</Text>
          </Grid2>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Grid2>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    height: "100%",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: 42,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  text: {
    marginVertical: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    color: "grey",
  },
});

export default ResumePreview;
