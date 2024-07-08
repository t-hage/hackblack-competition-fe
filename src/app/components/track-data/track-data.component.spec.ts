import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDataComponent } from './track-data.component';

describe('TrackDataComponent', () => {
  let component: TrackDataComponent;
  let fixture: ComponentFixture<TrackDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
