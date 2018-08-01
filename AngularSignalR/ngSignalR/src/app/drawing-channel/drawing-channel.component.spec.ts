import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingChannelComponent } from './drawing-channel.component';

describe('DrawingChannelComponent', () => {
  let component: DrawingChannelComponent;
  let fixture: ComponentFixture<DrawingChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
