import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDataViewComponent } from './model-data-view.component';

describe('ModelDataViewComponent', () => {
  let component: ModelDataViewComponent;
  let fixture: ComponentFixture<ModelDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelDataViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
