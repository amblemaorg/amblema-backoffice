import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NbSidebarService,
  NbMediaBreakpointsService,
  NbMenuService,
} from '@nebular/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  items = [{ title: 'Profile' }, { title: 'Log out' }];

  subscription: Subscription;

  constructor(
    private breakpointService: NbMediaBreakpointsService,
    private menuService: NbMenuService,
    protected sidebarService?: NbSidebarService
  ) {}

  ngOnInit(): void {
    this.subscription = this.menuService
      .onItemSelect()
      .subscribe((event: { tag: string; item: any }) => {
        if (window.innerWidth < 1200) {
          this.sidebarService.compact('menu-sidebar');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
}
