import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpfulTipsComponent } from './helpful-tips.component';

describe('HelpfulTipsComponent', () => {
  let component: HelpfulTipsComponent;
  let fixture: ComponentFixture<HelpfulTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpfulTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpfulTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
