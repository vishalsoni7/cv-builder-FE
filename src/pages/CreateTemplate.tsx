import { Box } from "@mui/material";
import ResumeForm from "../component/ResumeForm";
import { useResumeContext } from "../store/ResumeStore";
import { ResumeInitialValue } from "../types/resume";
import { initialResumeValues } from "../constant/initialValues";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { errorToast } from "../utils/toast";

/**
 * CreateTemplate Component
 *
 * This component is responsible for creating or editing a resume template.
 * - Uses `useParams` to check for an existing resume ID.
 * - Fetches resume data when an ID is present (for editing).
 * - Uses the `ResumeForm` component to handle user input.
 * - Fetches data from `useResumeContext` to populate the form.
 */
const CreateTemplate = () => {
  const { id } = useParams();
  const { fetchResumeById } = useResumeContext();
  const [resume, setResume] = useState<ResumeInitialValue>(initialResumeValues);

  useEffect(() => {
    const fetchResume = async () => {
      if (!id) return;

      try {
        const resumeData = await fetchResumeById(id);
        setResume(resumeData);
      } catch (err: any) {
        errorToast(err.message);
      }
    };

    fetchResume();
  }, [id, fetchResumeById]);

  return (
    <Box p={1}>
      <ResumeForm resume={resume} />
    </Box>
  );
};

export default CreateTemplate;
