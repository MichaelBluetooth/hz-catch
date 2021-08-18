import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportsViewComponent } from './imports-view.component';

describe('ImportsViewComponent', () => {
  let component: ImportsViewComponent;
  let fixture: ComponentFixture<ImportsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
