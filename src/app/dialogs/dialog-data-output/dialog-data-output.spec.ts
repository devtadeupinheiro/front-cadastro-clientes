import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataOutput } from './dialog-data-output';

describe('DialogDataOutput', () => {
  let component: DialogDataOutput;
  let fixture: ComponentFixture<DialogDataOutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDataOutput],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogDataOutput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
