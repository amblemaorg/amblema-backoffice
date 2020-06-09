import { EnrolledSchool } from "./enrolled-school.model";

export interface GeneralEnrolled {
  enrolledSchools: EnrolledSchool[];
  availableSchools: EnrolledSchool[];
}
