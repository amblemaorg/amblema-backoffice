import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription, Observable } from 'rxjs';
import {
  RequestContentState,
  UpdateRequestContent,
} from 'src/app/store/request/request-content-approval.action';
import { Select, Store } from '@ngxs/store';
import { InformationRequestService } from 'src/app/services/request/information-request.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';

@Component({
  selector: 'app-initial-workshop-details',
  templateUrl: './initial-workshop-details.component.html',
  styleUrls: ['./initial-workshop-details.component.scss'],
})
export class InitialWorkshopDetailsComponent implements OnInit, OnDestroy {
  @Select(RequestContentState.selectedContentRequest) data$: Observable<{
    any;
  }>;
  subscription: Subscription;

  data: any;
  statusSelected = '2';
  confirmAction = true;
  comment;

  dataMock = {
    // -- General data --
    project: {
      code: '222',
      sponsor: { name: 'Coca cola' },
      coordinator: { name: 'Juaquin' },
      school: { name: 'Sevallos' },
    },
    stepTag: '1',
    createdAt: '2020-06-02 20:38:23.499000',
    code: '000',
    // -- Details data --
    description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, aliquam
    asperiores? Doloremque, accusantium? Distinctio expedita, itaque quas,
    fugiat numquam eum soluta atque m'agni iure, nobis culpa veritatis voluptatum
    suscipit eos?`,
    images: [
      {
        image: `https://www.digital55.com/wp-content/uploads/2019/10/Renderizado_en_servidor_con_angular_universal.png`,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, aliquam
        asperiores? Doloremque, accusantium? Distinctio expedita, itaque quas,
        fugiat numquam eum soluta atque m'agni iure, nobis culpa veritatis voluptatum
        suscipit eos?`,
        status: '1',
      },
      {
        image: `https://i1.wp.com/blog.webtraining.zone/wp-content/uploads/2018/01/curso-profesional-vue.jpg?resize=825%2C510&ssl=1`,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, aliquam
        asperiores? Doloremque, accusantium? Distinctio expedita, itaque quas,
        fugiat numquam eum soluta atque m'agni iure, nobis culpa veritatis voluptatum
        suscipit eos?`,
        status: '1',
      },
      {
        image: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxbWDRp0uDnhvGkesRkA8DsHUomz2vNr07nD7AEE1_I29izRR6&usqp=CAU`,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, aliquam
        asperiores? Doloremque, accusantium? Distinctio expedita, itaque quas,
        fugiat numquam eum soluta atque m'agni iure, nobis culpa veritatis voluptatum
        suscipit eos?`,
        status: '1',
      },
      {
        image: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxbWDRp0uDnhvGkesRkA8DsHUomz2vNr07nD7AEE1_I29izRR6&usqp=CAU`,
        description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste, aliquam
        asperiores? Doloremque, accusantium? Distinctio expedita, itaque quas,
        fugiat numquam eum soluta atque m'agni iure, nobis culpa veritatis voluptatum
        suscipit eos?`,
        status: '1',
      },
    ],
  };

  customOptions: OwlOptions = {
    stagePadding: 50,

    autoHeight: true,
    margin: 70,
    dots: true,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };

  show = false;
  hasClass(el: any) {
    return (
      el.getAttribute('class') &&
      el.getAttribute('class').indexOf('show') !== -1
    );
  }

  constructor(
    protected serviceRequestStepApproval?: InformationRequestService,
    protected store?: Store,
    protected toastr?: CustomToastrService
  ) {}

  ngOnInit() {
    this.subscription = this.data$.subscribe((response) => {
      this.data = response;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onApprovedRequest() {
    this.subscription = this.serviceRequestStepApproval
      .updateRequestContentApproval({
        ...this.data,
        status: this.statusSelected,
        comments: this.comment,
      })
      .subscribe((res) => {
        this.store.dispatch(
          new UpdateRequestContent({
            ...this.data,
            status: this.statusSelected,
            comments: this.comment,
          })
        );
        this.toastr.updateSuccess(
          'Estatus actualizado',
          'Se ha cambiado el estatus de la solicitud'
        );
      });
  }
}
