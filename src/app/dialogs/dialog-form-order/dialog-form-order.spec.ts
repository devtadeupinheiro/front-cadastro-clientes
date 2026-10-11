import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormOrder } from './dialog-form-order';

describe('DialogFormOrder', () => {
  let component: DialogFormOrder;
  let fixture: ComponentFixture<DialogFormOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogFormOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
