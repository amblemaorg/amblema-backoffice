import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

declare var $: any;

describe('ModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('TestCase#2944 - Should be created', () => {
    const service: ModalService = TestBed.get(ModalService);
    expect(service).toBeTruthy();
  });

  it('TestCase#2944 - Should be modal functions', () => {
    const service: ModalService = TestBed.get(ModalService);

    expect( service.open('modal') ).toBeUndefined();
    expect( service.close('modal') ).toBeUndefined();
  });

  afterAll(() => {

  });
});
