import { useState, useCallback, useEffect, useMemo } from "react";
import {
  getAllResumes,
  updateResume,
  deleteResume,
  createResumeApi,
  getResumeById,
} from "../services/resume";
import {
  ResumeInitialValue,
  ResumeApiResponse,
  ResumeStoreType,
} from "../types/resume";
import { createStoreContext } from "../context/StoreContext";
import { useUserContext } from "./UserStore";

const useResumeStore = (): ResumeStoreType => {
  const { user, isAuthenticated } = useUserContext();
  const [resumes, setResumes] = useState<ResumeApiResponse[] | null>(null);

  /**
   * Fetches all resumes for the logged-in user bu userId
   */
  const fetchResumes = useCallback(async () => {
    if (!isAuthenticated || !user?._id) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const fetchedResumes = await getAllResumes(user._id);
      setResumes(fetchedResumes);
    } catch (error) {
      console.error("Failed to fetch resumes:", error);
    }
  }, [user?._id, isAuthenticated]);

  /**
   * Fetches a single resume by its ID
   */
  const fetchResumeById = useCallback(async (resumeId: string) => {
    try {
      const resume = await getResumeById(resumeId);

      return resume;
    } catch (error) {
      console.error("Failed to fetch resume by ID:", error);
    }
  }, []);

  /**
   * Create a new resume
   */
  const createResume = useCallback(
    async (resumeData: ResumeInitialValue) => {
      if (!isAuthenticated || !user?._id) {
        console.error("User is not authenticated");
        return;
      }

      try {
        const newResume = await createResumeApi(user._id, resumeData);

        // Ensure prev is always an array
        setResumes((prev) => [...(prev || []), newResume.resume]);
      } catch (error) {
        console.error("Error creating resume:", error);
      }
    },
    [user, isAuthenticated]
  );

  /**
   * Updates a resume by ID
   */
  const updateResumeById = useCallback(
    async (resumeId: string, updatedData: ResumeInitialValue) => {
      try {
        const updatedResume = await updateResume(resumeId, updatedData);
        setResumes((prev) =>
          prev
            ? prev.map((r) => (r._id === resumeId ? updatedResume : r))
            : null
        );

        await fetchResumes();
      } catch (error) {
        console.error("Failed to update resume:", error);
      }
    },
    [fetchResumes]
  );

  /**
   * Deletes a resume by ID
   */
  const deleteResumeById = useCallback(async (resumeId: string) => {
    try {
      await deleteResume(resumeId);
      setResumes((prev) =>
        prev ? prev.filter((r) => r._id !== resumeId) : null
      );
    } catch (error) {
      console.error("Failed to delete resume:", error);
    }
  }, []);

  // Auto-fetch resumes when user logs in
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      fetchResumes();
    }
  }, [isAuthenticated, user?._id, fetchResumes]);

  return useMemo(
    () => ({
      resumes,
      fetchResumes,
      createResume,
      updateResumeById,
      deleteResumeById,
      fetchResumeById,
    }),
    [
      resumes,
      fetchResumes,
      createResume,
      updateResumeById,
      deleteResumeById,
      fetchResumeById,
    ]
  );
};

// Create the context for ResumeStore
export const [ResumeProvider, useResumeContext] =
  createStoreContext<ResumeStoreType>(useResumeStore);
