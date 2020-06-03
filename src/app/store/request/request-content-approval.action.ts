import { RequestContent } from '../../models/request/request-content-approval.model';
import { State, Selector, NgxsOnInit, StateContext, Action } from '@ngxs/store';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { patch, updateItem, removeItem } from '@ngxs/store/operators';

export interface RequestContentModel {
  requestsContent: RequestContent[];
  selectedRequestContent?: any;
}

export class GetRequestsContent {
  static readonly type = '[RequestContent] Get Request Content';
}

export class UpdateRequestContent {
  static readonly type = '[RequestContent] Update Request Content';
  constructor( public newData: RequestContent ) {}
}

export class SelectedRequestContent {
  static readonly type = '[selectedRequestContent] Selected Request Content';
  constructor(public payload: any) {}
}

export class DeleteRequestContent {
  static readonly type = '[RequestContent] Delete Request Content';
  constructor( public id: string ) {}
}

@State<RequestContentModel>({
  name: 'requestcontent',
  defaults: {
    requestsContent: [],
  },
})
export class RequestContentState implements NgxsOnInit {
  @Selector()
  static requestsContent(
    state: RequestContentModel
  ): RequestContent[] | null {
    return state.requestsContent;
  }

  @Selector()
  static selectedContentRequest(state: RequestContentModel): any | null {
    return state.selectedRequestContent;
  }

  constructor(private RequestContentService: InformationRequestService) {}

  ngxsOnInit(ctx: StateContext<RequestContentModel>): void {
    ctx.dispatch(new GetRequestsContent());
  }

  @Action(GetRequestsContent)
  getRequestsContent(ctx: StateContext<RequestContentModel>) {
    this.RequestContentService
      .getRequestsContent()
      .subscribe((response) => {
        ctx.setState({
          ...ctx.getState(),
          requestsContent: response,
        });
      });
  }

  @Action(UpdateRequestContent)
  UpdateRequestContent(ctx: StateContext<RequestContentModel>, action: UpdateRequestContent) {

    ctx.setState( patch( {
      ...ctx.getState(),
      requestsStepsApproval: updateItem<RequestContent>( request => request.id === action.newData.id, action.newData ),
      selectedRequestContent: action.newData
    }));

  }

  @Action(SelectedRequestContent)
  selectedRequestContent(
    ctx: StateContext<RequestContentModel>,
    action: SelectedRequestContent
  ) {
    ctx.setState({
      ...ctx.getState(),
      selectedRequestContent: action.payload,
    });
  }

  @Action(DeleteRequestContent)
  deleteRequestContent(ctx: StateContext<RequestContentModel>, action: DeleteRequestContent) {

    ctx.setState(patch({
      ...ctx.getState(),
      requestsStepsApproval: removeItem<RequestContent>( item => item.id === action.id )
    }));
  }
}
