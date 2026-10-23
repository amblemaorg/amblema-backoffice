import { Component, OnInit } from '@angular/core';
import { YearbookOrderService, YearbookOrderItem } from 'src/app/services/yearbook-order.service';
import { CustomToastrService } from 'src/app/services/helper/custom-toastr.service';
import { AuthService } from 'src/app/services/user/auth.service';
import { ALL_ACTIONS } from 'src/app/store/_shader/all-actions';

@Component({
  selector: 'app-yearbook-order',
  templateUrl: './yearbook-order.component.html',
  styles: []
})
export class YearbookOrderComponent implements OnInit {

  readonly lapses = ['1', '2', '3'];

  items: { [lapse: string]: YearbookOrderItem[] } = { '1': [], '2': [], '3': [] };
  saving: { [lapse: string]: boolean } = {};
  loading = false;

  canEdit = new AuthService().isAllowed(ALL_ACTIONS.ACTIVITY_EDIT);

  constructor(
    private yearbookOrderService: YearbookOrderService,
    private toastr: CustomToastrService
  ) { }

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder() {
    this.loading = true;
    this.yearbookOrderService.getYearbookOrder().subscribe(data => {
      this.lapses.forEach(lapse => {
        this.items[lapse] = this.copyItems(data[`lapse${lapse}`]);
      });
      this.loading = false;
    }, () => {
      this.loading = false;
      this.toastr.error('Error', 'No se pudo cargar el orden del AmbLeMario');
    });
  }

  isValid(lapse: string): boolean {
    return this.items[lapse].every(item => Number.isInteger(+item.order) && +item.order >= 0 && item.order !== null);
  }

  save(lapse: string) {
    if (!this.isValid(lapse)) {
      this.toastr.error('Error', 'El orden debe ser un número entero mayor o igual a 0');
      return;
    }
    const items = this.items[lapse].map(item => ({ key: item.key, order: +item.order }));
    this.persist(lapse, items, 'Orden del AmbLeMario guardado');
  }

  reset(lapse: string) {
    this.persist(lapse, [], 'Se restableció el orden por defecto');
  }

  private persist(lapse: string, items: { key: string; order: number }[], successMsg: string) {
    this.saving[lapse] = true;
    this.yearbookOrderService.saveYearbookOrder(lapse, items).subscribe(res => {
      this.items[lapse] = this.copyItems(res[`lapse${lapse}`]);
      this.saving[lapse] = false;
      this.toastr.updateSuccess('Correcto', successMsg);
    }, err => {
      this.saving[lapse] = false;
      const msg = err && err.error && err.error.message ? err.error.message : 'No se pudo guardar el orden';
      this.toastr.error('Error', msg);
    });
  }

  private copyItems(items: YearbookOrderItem[]): YearbookOrderItem[] {
    return (items || []).map(item => ({ ...item }));
  }
}
