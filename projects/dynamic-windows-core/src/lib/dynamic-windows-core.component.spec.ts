import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWindowsCoreComponent } from './dynamic-windows-core.component';

describe('DynamicWindowsCoreComponent', () => {
  let component: DynamicWindowsCoreComponent;
  let fixture: ComponentFixture<DynamicWindowsCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicWindowsCoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicWindowsCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
