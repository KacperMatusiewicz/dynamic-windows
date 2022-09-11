import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyMusicPlayerComponent } from './fancy-music-player.component';

describe('FancyMusicPlayerComponent', () => {
  let component: FancyMusicPlayerComponent;
  let fixture: ComponentFixture<FancyMusicPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FancyMusicPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FancyMusicPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
