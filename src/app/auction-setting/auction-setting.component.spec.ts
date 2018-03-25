import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionSettingComponent } from './auction-setting.component';

describe('AuctionSettingComponent', () => {
  let component: AuctionSettingComponent;
  let fixture: ComponentFixture<AuctionSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
