import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantitasComponent } from './plantitas.component';

describe('PlantitasComponent', () => {
  let component: PlantitasComponent;
  let fixture: ComponentFixture<PlantitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
