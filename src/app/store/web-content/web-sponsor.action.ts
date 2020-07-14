import { Testimonial } from '../../_models/web/testimonial.model';
import { State, NgxsOnInit, Action, StateContext, Selector } from '@ngxs/store';
import { WebSponsor, SponsorList } from '../../_models/web/web-sponsor.model';
import {
  append,
  patch,
  updateItem,
  removeItem,
  insertItem,
} from '@ngxs/store/operators';
import { CustomToastrService } from '../../services/helper/custom-toastr.service';
import { WebSponsorService } from '../../services/web-content/web-sponsor.service';
import {
  SponsorUserState,
  SponsorUserModel,
} from '../user/sponsor-user.action';
import { SponsorUser } from 'src/app/_models/user/sponsor-user.model';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Item } from 'pdfmake-wrapper';

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

  @Selector()
  static sponsorHave(state: WebSponsor): SponsorList[] | null {
    return state.sponsorPage.sponsors;
  }

  @Selector([SponsorUserState])
  static sponsorAvailable(
    state: WebSponsor,
    userState: SponsorUserModel
  ): SponsorUser[] | null {
    let sponsorUser: SponsorUser[] = [];

    if (state.sponsorPage.sponsors.length) {
      // Filter by ids
      const object1Names = state.sponsorPage.sponsors.map((obj) => obj.id); // for caching the result

      // Compare ids include the other list
      sponsorUser = userState.sponsorUsers.filter(
         (name) => !object1Names.includes(name.id) && name.image && name.webSite
       );

    } else {
      userState.sponsorUsers.forEach((parent) => {
         if (parent.image && parent.webSite) {
        sponsorUser.push(parent);
         }
      });
    }

    return sponsorUser;
  }

  @Selector()
  static sponsorPositions(state: WebSponsor): any[] | null {
    const position: any[] = [];
    let i = 0;

    state.sponsorPage.sponsors.forEach((parent) => {
       if (parent.image && parent.webSite) {
      i++;
      position.push({ id: i, name: i });
       }
    });

    if (state.sponsorPage.sponsors.length === 0) {
      position.push({
        id: 1,
        name: `Ultima posicion ${1}`,
      });
    }

    return position;
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



    ctx.getState().sponsorPage.sponsors.forEach((element, key) => {

        ctx.setState(

          patch({
            ...ctx.getState(),
            sponsorPage: patch({
              sponsors: updateItem<SponsorList>(
                (item) => item.position >= action.payload.position && item.id === element.id,
                {
                  ...element,
                  position: element.position + 1,
                }
              ),
            }),
          })
        );

    });

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


    ctx.getState().sponsorPage.sponsors.forEach((element, key) => {


      ctx.setState(

        patch({
          ...ctx.getState(),
          sponsorPage: patch({
            sponsors: updateItem<SponsorList>(
              (item) => item.position > element.position && item.id === element.id,
              {
                ...element,
                position: element.position - 1,
              }
            ),
          }),
        })
      );

  });


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
