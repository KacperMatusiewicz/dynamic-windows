import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyWindowComponent } from './fancy-window.component';

describe('FancyWindowComponent', () => {
  let component: FancyWindowComponent;
  let fixture: ComponentFixture<FancyWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FancyWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FancyWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
