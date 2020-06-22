export interface RequestStepApproval {
  stepId: string;
  createdAt: string;
  stepHasUpload: boolean;
  stepChecklist: any[];
  stepUploadedFile?: any;
  updatedAt: string;
  stepDate?: any;
  stepIsStandard: boolean;
  stepHasFile: boolean;
  stepTag: string;
  stepHasVideo: boolean;
  project: Project;
  stepVideo?: any;
  stepHasText: boolean;
  stepHasDate: boolean;
  stepName: string;
  status: string;
  stepText: string;
  user: string;
  id: string;
  stepHasChecklist: boolean;
  stepFile?: any;
  comments?: any;
  stepDevName: string;
}

interface Project {
  code: string;
  id: string;
}
