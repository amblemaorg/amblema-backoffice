import { RequestContent } from "../../_models/request/request-content-approval.model";
import { State, Selector, StateContext, Action } from "@ngxs/store";
import { InformationRequestService } from "src/app/services/request/information-request.service";
import { patch, updateItem, removeItem } from "@ngxs/store/operators";
import { REQUEST_STATUS } from "src/app/_helpers/convention/request-status";
import { Injectable } from "@angular/core";

export interface RequestContentModel {
  requestsContent: RequestContent[];
  selectedRequestContent?: any;
}

export class GetRequestsContent {
  static readonly type = "[RequestContent] Get Request Content";
}

export class GetRequestsContentCompact {
  static readonly type = "[RequestContent] Get Request Content Compact";
}

export class GetRequestContentById {
  static readonly type = "[RequestContent] Get Request Content By Id";
  constructor(public id: string) { }
}

export class UpdateRequestContent {
  static readonly type = "[RequestContent] Update Request Content";
  constructor(public newData: RequestContent) { }
}

export class SelectedRequestContent {
  static readonly type = "[selectedRequestContent] Selected Request Content";
  constructor(public payload: any) { }
}

export class DeleteRequestContent {
  static readonly type = "[RequestContent] Delete Request Content";
  constructor(public id: string) { }
}

@State<RequestContentModel>({
  name: "requestcontent",
  defaults: {
    requestsContent: [],
  },
})
@Injectable()
@Injectable()
export class RequestContentState {
  @Selector()
  static requestsContent(state: RequestContentModel): RequestContent[] | null {
    return state.requestsContent;
  }

  @Selector()
  static requestsContentPending(
    state: RequestContentModel
  ): RequestContent[] | null {
    const value: any[] = [];

    state.requestsContent.forEach((response) => {
      if (response.status === REQUEST_STATUS.PENDING.CODE) {
        value.push(response);
      }
    });

    return value;
  }

  @Selector()
  static selectedContentRequest(state: RequestContentModel): any | null {
    return state.selectedRequestContent;
  }

  constructor(private RequestContentService: InformationRequestService) { }

  @Action(GetRequestsContent)
  getRequestsContent(ctx: StateContext<RequestContentModel>) {
    this.RequestContentService.getRequestsContent().subscribe((response) => {
      ctx.setState({
        ...ctx.getState(),
        requestsContent: response,
      });
    });
  }

  @Action(GetRequestsContentCompact)
  getRequestsContentCompact(ctx: StateContext<RequestContentModel>) {
    // requesting id,code,project,type,user,status,createdAt,updatedAt
    // Note: Detail is huge, so we avoid it. 
    // project field might be needed if table filters by project ID? 
    // Table columns: code, project(id), typeUser, user(name), type, updatedAt, status
    // User type field is 'typeUser' in model, but backend might send it inside 'user'?
    // Let's check service logic for 'typeUser'. Service appends 'typeUser' to record.
    // user field is 'user.name'.
    // updated fields: id,code,project,type,user,status,updatedAt,createdAt

    this.RequestContentService.getRequestsContent('id,code,project,type,user,status,updatedAt,createdAt').subscribe((response) => {
      ctx.setState({
        ...ctx.getState(),
        requestsContent: response,
      });
    });
  }

  @Action(GetRequestContentById)
  getRequestContentById(ctx: StateContext<RequestContentModel>, action: GetRequestContentById) {
    return this.RequestContentService.getRequestContent(action.id).subscribe((response) => {
      ctx.setState(patch({
        ...ctx.getState(),
        selectedRequestContent: response
      }));
    });
  }

  @Action(UpdateRequestContent)
  UpdateRequestContent(
    ctx: StateContext<RequestContentModel>,
    action: UpdateRequestContent
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        requestsContent: updateItem<RequestContent>(
          (request) => request.id === action.newData.id,
          action.newData
        ),
        selectedRequestContent: action.newData,
      })
    );
  }

  @Action(SelectedRequestContent)
  selectedRequestContent(
    ctx: StateContext<RequestContentModel>,
    action: SelectedRequestContent
  ) {
    let value: any;

    ctx.getState().requestsContent.forEach((response) => {
      if (response.id === action.payload.id) {
        value = response;
      }
    });

    ctx.setState({
      ...ctx.getState(),
      selectedRequestContent: value,
    });
  }

  @Action(DeleteRequestContent)
  deleteRequestContent(
    ctx: StateContext<RequestContentModel>,
    action: DeleteRequestContent
  ) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        requestsContent: removeItem<RequestContent>(
          (item) => item.id === action.id
        ),
      })
    );
  }
}
