import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExampleHtmlWrappingComponent} from './example-html-wrapping.component';

describe('ExampleHtmlWrappingComponent', () => {
  let component: ExampleHtmlWrappingComponent;
  let fixture: ComponentFixture<ExampleHtmlWrappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleHtmlWrappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleHtmlWrappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
