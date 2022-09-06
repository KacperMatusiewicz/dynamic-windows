import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SimpleWindowComponent} from './simple-window.component';

describe('WindowWrapperComponent', () => {
  let component: SimpleWindowComponent;
  let fixture: ComponentFixture<SimpleWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
