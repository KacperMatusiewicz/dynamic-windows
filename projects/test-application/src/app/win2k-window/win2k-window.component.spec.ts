import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Win2kWindowComponent} from './win2k-window.component';

describe('Win2kWindowComponent', () => {
  let component: Win2kWindowComponent;
  let fixture: ComponentFixture<Win2kWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Win2kWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Win2kWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
