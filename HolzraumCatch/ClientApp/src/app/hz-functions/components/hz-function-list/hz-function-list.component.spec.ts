import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HzFunctionListComponent } from './hz-function-list.component';

describe('HzFunctionListComponent', () => {
  let component: HzFunctionListComponent;
  let fixture: ComponentFixture<HzFunctionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HzFunctionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HzFunctionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
