export interface RequestValidateInformation {
  status: string;
  createdAt: string;
  project: Project;
  updatedAt: string;
  code: string;
  id: string;
}

interface Project {
  coordinator: User;
  code: string;
  sponsor: User;
  school: User;
  id: string;
}

interface User {
  id: string;
  name: string;
}
