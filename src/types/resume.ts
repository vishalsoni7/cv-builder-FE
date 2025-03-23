/**
 * Interface representing the structure of a resume.
 */
export interface ResumeInitialValue {
  _id?: string;
  fullName: string;
  number: string;
  designation: string;
  email: string;
  summary: string;
  skills: string[];
  experience: string[];
  education: string[];
  projects: string[];
  user: string;
}

/**
 * Interface extending ResumeInitialValue to include API-related metadata.
 */
export interface ResumeApiResponse extends ResumeInitialValue {
  user: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Resume Store Type Definition
 */
export interface ResumeStoreType {
  resumes: ResumeApiResponse[] | null;
  fetchResumes: () => Promise<void>;
  createResume: (resumeData: ResumeInitialValue) => Promise<void>;
  updateResumeById: (
    resumeId: string,
    updatedData: ResumeInitialValue
  ) => Promise<void>;
  deleteResumeById: (resumeId: string) => Promise<void>;
  fetchResumeById: (resumeId: string) => Promise<ResumeInitialValue>;
}

/**
 * Props definition for rendering a resume document.
 */
export interface ResumeDocumentProps {
  resume: ResumeInitialValue;
}
