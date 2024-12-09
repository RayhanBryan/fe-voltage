import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGeneratorFnComponent } from './data-generator-fn.component';

describe('DataGeneratorFnComponent', () => {
  let component: DataGeneratorFnComponent;
  let fixture: ComponentFixture<DataGeneratorFnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataGeneratorFnComponent]
    });
    fixture = TestBed.createComponent(DataGeneratorFnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
