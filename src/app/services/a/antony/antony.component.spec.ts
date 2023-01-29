import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntonyComponent } from './antony.component';

describe('AntonyComponent', () => {
  let component: AntonyComponent;
  let fixture: ComponentFixture<AntonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntonyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
