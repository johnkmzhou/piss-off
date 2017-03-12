import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrinalComponent } from './urinal.component';

describe('UrinalComponent', () => {
  let component: UrinalComponent;
  let fixture: ComponentFixture<UrinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
