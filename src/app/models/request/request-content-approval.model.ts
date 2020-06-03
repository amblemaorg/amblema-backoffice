// -- General data --

export interface RequestContent {
  id: string;
  code: string;
  project: Project;
  type: string;
  user: User;
  comments: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  detail: Detail;
}

interface Project {
  id: string;
  code: string;
  coordinator: User;
  sponsor: User;
  school: User;
}

interface User {
  id: string;
  name: string;
}

/**
 * Details info
 */

interface Detail extends StepDetails, ActivityDetails, SliderDetails {}

// -- Step information --

interface StepDetails {
  stepId?: string;
  stepName?: string;
  stepDevName?: string;
  stepHasText?: string;
  stepHasDate?: string;
  stepHasFile?: string;
  stepHasVideo?: string;
  stepHasChecklist?: string;
  stepHasUpload?: string;
  stepChecklist?: StepChecklist[];
  stepDate?: string;
  stepUploadedFile?: StepUploadedFile;
  stepText?: string;
  stepFile?: string;
  stepVideo?: string;
}

interface StepUploadedFile {
  name: string;
  url: string;
}

interface StepChecklist {
  id: string;
  name: string;
  checked: string;
}

// -- Activity --

interface ActivityDetails {
  pecaId?: string;
  lapse?: string;
  id?: string;
  name?: string;
  devName?: string;
  hasText?: string;
  hasDate?: string;
  hasFile?: string;
  hasVideo?: string;
  hasChecklist?: string;
  hasUpload?: string;
  text?: string;
  file?: File;
  video?: File;
  checklist?: Checklist[];
  date?: string;
  uploadedFile?: File;
}

interface File {
  url: string;
  name: string;
}

interface Checklist {
  id: string;
  name: string;
  checked: string;
}

// -- Slider Details --
interface SliderDetails {
  pecaId?: string;
  image?: string;
  description?: string;
}
