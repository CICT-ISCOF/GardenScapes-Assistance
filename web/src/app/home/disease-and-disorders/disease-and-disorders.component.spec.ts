import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseAndDisordersComponent } from './disease-and-disorders.component';

describe('DiseaseAndDisordersComponent', () => {
  let component: DiseaseAndDisordersComponent;
  let fixture: ComponentFixture<DiseaseAndDisordersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseAndDisordersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseAndDisordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
