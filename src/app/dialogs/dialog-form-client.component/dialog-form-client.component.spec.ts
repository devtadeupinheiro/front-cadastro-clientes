import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormClientComponent } from './dialog-form-client.component';

describe('DialogFormClientComponent', () => {
  let component: DialogFormClientComponent;
  let fixture: ComponentFixture<DialogFormClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFormClientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogFormClientComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
