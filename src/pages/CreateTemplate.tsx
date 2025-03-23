import { Box } from "@mui/material";
import ResumeForm from "../component/ResumeForm";
import { useResumeContext } from "../store/ResumeStore";
import { ResumeInitialValue } from "../types/resume";
import { initialResumeValues } from "../constant/initialValues";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Template = () => {
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
        console.error(err.message || "Failed to fetch resume");
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

export default Template;
