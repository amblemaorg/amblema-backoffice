import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./pages-routing.module";
import {
  NbTokenStorage,
  NbTokenLocalStorage,
  NbAuthModule,
} from "@nebular/auth";
import { HttpClientModule } from "@angular/common/http";
import {
  NbLayoutModule,
  NbSidebarModule,
  NbIconModule,
  NbActionsModule,
  NbUserModule,
  NbMenuModule,
  NbContextMenuModule,
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbToastrModule,
  NbListModule,
  NbPopoverModule,
  NbBadgeModule,
} from "@nebular/theme";
import { HeaderComponent } from "./_components/layouts/header/header.component";
import { RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { CustomToastrService } from "../services/helper/custom-toastr.service";
import { MenuSetUp } from "./pages-menu-service";
import { NgxsModule } from "@ngxs/store";
import { RolesState } from "../store/role.action";
import { LearningState } from "../store/learning.action";
import { WebHomeState } from "../store/web-content/web-home.action";
import { WebAboutState } from "../store/web-content/web-about.action";
import { WebSponsorState } from "../store/web-content/web-sponsor.action";
import { WebCoordinatorState } from "../store/web-content/web-coordinator.action";
import { PostsState } from "../store/web-content/blog.action";
import { AdminUserState } from "../store/user/admin-user.action";
import { CoordinatorUserState } from "../store/user/coordinator-user.action";
import { SponsorUserState } from "../store/user/sponsor-user.action";
import { SchoolUserState } from "../store/user/school-user.action";
import { LapseActivityState } from "../store/lapse-activities.action";
import { ProjectState } from "../store/project.action";
import { StepState } from "../store/step.action";
import { EnvironmentalProjectState } from "../store/environmental-project.action";
import { UserCreationRequestState } from "../store/request/user-creation-request.action";
import { RequestContentState } from "../store/request/request-content-approval.action";
import { ProjectValidationRequestState } from "../store/request/project-validation-request.action";
import { ProjectRequestState } from "../store/request/project-requests.action";
import { SchoolYearEnrolledState } from "../store/_enrolled/school-year-enrolled.action";
import { GeneralEnrolledState } from "../store/_enrolled/enrolled.action";
import { AddressState } from "../store/_address/address.action";
import { environment } from "src/environments/environment";
import { ActivityStrategyState } from "../store/activity-strategy.action";
import { SharedModule } from "./_components/shared/shared.module";
@NgModule({
  declarations: [PagesComponent, HeaderComponent],
  imports: [
    // -- NGXS --
    NgxsModule.forRoot(
      [
        /* Auth */
        RolesState,

        /* Content web */
        LearningState,
        WebHomeState,
        WebAboutState,
        WebSponsorState,
        WebCoordinatorState,
        PostsState,

        /* Users */
        AdminUserState,
        CoordinatorUserState,
        SponsorUserState,
        SchoolUserState,

        /* PECA */
        LapseActivityState,
        ProjectState,
        StepState,
        EnvironmentalProjectState,

        // -- Requests --
        UserCreationRequestState,
        ProjectRequestState,
        RequestContentState,
        ProjectValidationRequestState,

        // --Enrolled --
        SchoolYearEnrolledState,
        GeneralEnrolledState,

        AddressState,
        ActivityStrategyState,
      ],

      {
        compatibility: {
          strictContentSecurityPolicy: true,
        },
        developmentMode: !environment.production,
      }
    ),
    // NgxsStoragePluginModule.forRoot({

    // }),

    RouterModule,
    DashboardRoutingModule,
    CommonModule,
    SharedModule,
    NbListModule,
    NbPopoverModule,
    HttpClientModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbAuthModule.forRoot({}),
    NbCardModule,
    NbIconModule,
    NbActionsModule,
    NbInputModule,
    NbSelectModule,
    NbUserModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbBadgeModule,
    NbToastrModule.forRoot(),
  ],
  exports: [NbIconModule],
  providers: [
    MenuSetUp,
    CustomToastrService,
    { provide: NbTokenStorage, useClass: NbTokenLocalStorage },
  ],
})
export class PagesModule {}
