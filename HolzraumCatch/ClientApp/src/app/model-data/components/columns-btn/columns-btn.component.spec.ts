import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsBtnComponent } from './columns-btn.component';

describe('ColumnsBtnComponent', () => {
  let component: ColumnsBtnComponent;
  let fixture: ComponentFixture<ColumnsBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnsBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnsBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
