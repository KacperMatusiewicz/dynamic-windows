import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HtmlWrappingWindowComponent} from './html-wrapping-window.component';

describe('HtmlWrappingWindowComponent', () => {
  let component: HtmlWrappingWindowComponent;
  let fixture: ComponentFixture<HtmlWrappingWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtmlWrappingWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlWrappingWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
