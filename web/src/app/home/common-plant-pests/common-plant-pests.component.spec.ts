import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPlantPestsComponent } from './common-plant-pests.component';

describe('CommonPlantPestsComponent', () => {
  let component: CommonPlantPestsComponent;
  let fixture: ComponentFixture<CommonPlantPestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonPlantPestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonPlantPestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
