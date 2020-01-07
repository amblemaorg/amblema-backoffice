import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {
  NbIconModule,
  NbActionsModule,
  NbSidebarModule,
  NbSidebarService,
  NbThemeModule,
  NbLayoutModule,
  NbContextMenuModule,
  NbMenuService } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

describe('HeaderComponent', () => {
   let component: HeaderComponent;
   let fixture: ComponentFixture<HeaderComponent>;

   beforeEach(async(() => {
     TestBed.configureTestingModule({
       declarations: [ HeaderComponent ],
       imports: [
         NbIconModule,
         NbActionsModule,
         NbEvaIconsModule,
         NbThemeModule.forRoot({ name: 'default' }),
         NbSidebarModule,
         NbLayoutModule,
         NbContextMenuModule
       ],
       providers: [
         NbSidebarService,
         NbMenuService
       ]
     })
     .compileComponents();
   }));
   beforeEach(() => {
     fixture = TestBed.createComponent(HeaderComponent);
     component = fixture.componentInstance;
     fixture.detectChanges();
   });
   it('should create', () => {
     expect(component).toBeTruthy();
   });
});
