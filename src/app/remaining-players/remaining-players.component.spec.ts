import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemainingPlayersComponent } from './remaining-players.component';

describe('RemainingPlayersComponent', () => {
  let component: RemainingPlayersComponent;
  let fixture: ComponentFixture<RemainingPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemainingPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemainingPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
