import { RequestValidateInformation } from "src/app/models/request/requests-validate-information.model";

export interface RequestsValidateInformationModel {
  requestsValidateInformation: RequestValidateInformation[];
  selectedRequest?: any;
}

export class UpdateRequestStepApproval {
  static readonly type =
    "[RequestValidateInformation] Update Request Validate Information";
  constructor(public newData: RequestValidateInformation) {}
}

export class SelectedRequest {
  static readonly type = "[selectedRequest] Selected Request";
  constructor(public payload: any) {}
}

export class DeleteRequestStepApproval {
  static readonly type = "[RequestStepApproval] Delete Request Step Approval";
  constructor(public id: string) {}
}
