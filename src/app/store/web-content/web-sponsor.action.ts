import { Testimonial } from '../../_models/web/testimonial.model';
import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { WebSponsor, SponsorList } from '../../_models/web/web-sponsor.model';
import { append, patch, updateItem, removeItem } from '@ngxs/store/operators';
import { CustomToastrService } from '../../services/helper/custom-toastr.service';
import { WebSponsorService } from '../../services/web-content/web-sponsor.service';

// -- Web Sponsor class action --

export class GetWebSponsor {
  static readonly type = '[WebSponsor] Get Web Sponsor';
}

export class SetWebSponsor {
  static readonly type = '[WebSponsor] Set Web Sponsor';
  constructor(public payload: WebSponsor) {}
}

// -- Testimonial class action --

export class SetTestimonialWebSponsor {
  static readonly type = '[Testimonial] Set Testimonial';
  constructor(public payload: Testimonial) {}
}

export class UpdateTestimonialWebSponsor {
  static readonly type = '[Testimonial] Update Testimonial';
  constructor(
    public oldTestimonial: Testimonial,
    public newTestimonial: Testimonial
  ) {}
}

export class DeleteTestimonialWebSponsor {
  static readonly type = '[Testimonial] Delete Testimonial';
  constructor(public payload: Testimonial) {}
}

// -- Sponsor list --

export class AddSponsor {
  static readonly type = '[SponsorList] Add Sponsor';
  constructor(public payload: SponsorList) {}
}

export class DeleteSponsor {
  static readonly type = '[SponsorList] Delete Sponsor';
  constructor(public id: string) {}
}

@State<WebSponsor>({
  name: 'websponsor',
  defaults: {
    sponsorPage: {
      backgroundImage: '',
      testimonials: [],
      steps: [],
      sponsors: [],
    },
  },
})
export class WebSponsorState implements NgxsOnInit {
  @Selector()
  static webSponsor(state: WebSponsor): WebSponsor | null {
    return state;
  }

  constructor(
    private toastr: CustomToastrService,
    private webSponsorService: WebSponsorService
  ) {}

  ngxsOnInit(ctx: StateContext<WebSponsor>) {
    ctx.dispatch(new GetWebSponsor());
  }

  // -- Web sponsor's actions --

  @Action(GetWebSponsor)
  getWebSponsor(ctx: StateContext<WebSponsor>) {
    return this.webSponsorService
      .getContentWebSponsor()
      .subscribe((response) => {
        if (response.sponsorPage) {
          ctx.setState({ sponsorPage: response.sponsorPage });
        }
      });
  }

  @Action(SetWebSponsor)
  setWebSponsor(ctx: StateContext<WebSponsor>, action: SetWebSponsor) {
    ctx.setState({
      ...ctx.getState(),
      sponsorPage: {
        ...ctx.getState().sponsorPage,
        backgroundImage: action.payload.sponsorPage.backgroundImage,
        steps: action.payload.sponsorPage.steps,
      },
    });
  }

  // -- Testimonial actions --

  @Action(SetTestimonialWebSponsor)
  setTestimonialWebSponsor(
    ctx: StateContext<WebSponsor>,
    action: SetTestimonialWebSponsor
  ) {
    ctx.setState(
      patch({
        sponsorPage: patch({
          testimonials: append([action.payload]),
        }),
      })
    );
  }

  @Action(UpdateTestimonialWebSponsor)
  updateTestimonialWebSponsor(
    ctx: StateContext<WebSponsor>,
    action: UpdateTestimonialWebSponsor
  ) {
    ctx.setState(
      patch({
        sponsorPage: patch({
          testimonials: updateItem<Testimonial>(
            (testimonial) => testimonial === action.oldTestimonial,
            action.newTestimonial
          ),
        }),
      })
    );
  }

  @Action(DeleteTestimonialWebSponsor)
  deleteTestimonialWebSponsor(
    ctx: StateContext<WebSponsor>,
    action: DeleteTestimonialWebSponsor
  ) {
    ctx.setState(
      patch({
        sponsorPage: patch({
          testimonials: removeItem<Testimonial>(
            (testimonial) => testimonial === action.payload
          ),
        }),
      })
    );
  }

  // -- Sponsor list --

  @Action(AddSponsor)
  addSponsor(ctx: StateContext<WebSponsor>, action: AddSponsor) {
    // -- No repeat the same position --

    ctx.getState().sponsorPage.sponsors.forEach((value) => {
      if (value.position === action.payload.position) {
        ctx.setState(
          patch({
            ...ctx.getState(),
            sponsorPage: patch({
              sponsors: updateItem<SponsorList>(
                (item) => item.position === action.payload.position,
                { ...value, position: (value.position + 1) }
              ),
            }),
          })
        );
      }
    });

    // -- Add element --

    ctx.setState(
      patch({
        ...ctx.getState(),
        sponsorPage: patch({
          sponsors: append([action.payload]),
        }),
      })
    );
  }

  @Action(DeleteSponsor)
  deleteSponsor(ctx: StateContext<WebSponsor>, action: DeleteSponsor) {
    ctx.setState(
      patch({
        ...ctx.getState(),
        sponsorPage: patch({
          sponsors: removeItem<SponsorList>((user) => user.id === action.id),
        }),
      })
    );
  }
}
