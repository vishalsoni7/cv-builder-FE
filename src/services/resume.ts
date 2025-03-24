import axios from "axios";
import { ResumeInitialValue } from "../types/resume";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Creates a new resume
 * @param resumeData - Resume data containing fullName, email, number, skills, etc.
 * @returns The created resume object or throws an error
 */
export const createResumeApi = async (
  userId: string,
  resumeData: ResumeInitialValue
) => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const payload = { ...resumeData, user: userId };
    const { data } = await axios.post(`${BACKEND_BASE_URL}/resume`, payload);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error creating resume");
  }
};

/**
 * Fetches all resumes from the server
 * @returns An array of resume objects or throws an error
 */
export const getAllResumes = async (userId: string) => {
  try {
    const response = await axios.get(
      `${BACKEND_BASE_URL}/resume?userId=${userId}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching resumes");
  }
};

/**
 * Fetches a single resume by its ID
 * @param resumeId - The ID of the resume to retrieve
 * @returns The requested resume object or throws an error
 */
export const getResumeById = async (resumeId: string) => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/resume/${resumeId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error fetching resume");
  }
};

/**
 * Updates a resume by ID
 * @param resumeId - The ID of the resume to update
 * @param updatedData - The updated resume data
 * @returns The updated resume object or throws an error
 */
export const updateResume = async (
  resumeId: string,
  updatedData: ResumeInitialValue
) => {
  try {
    const response = await axios.put(
      `${BACKEND_BASE_URL}/resume/${resumeId}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating resume");
  }
};

/**
 * Deletes a resume by ID
 * @param resumeId - The ID of the resume to delete
 * @returns A success message or throws an error
 */
export const deleteResume = async (resumeId: string) => {
  try {
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/resume/${resumeId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error deleting resume");
  }
};
