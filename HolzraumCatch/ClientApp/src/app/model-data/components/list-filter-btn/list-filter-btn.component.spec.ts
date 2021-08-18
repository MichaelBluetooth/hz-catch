import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilterBtnComponent } from './list-filter-btn.component';

describe('ListFilterBtnComponent', () => {
  let component: ListFilterBtnComponent;
  let fixture: ComponentFixture<ListFilterBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFilterBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
