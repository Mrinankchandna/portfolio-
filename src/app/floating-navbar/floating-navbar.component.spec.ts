import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingNavbarComponent } from './floating-navbar.component';

describe('FloatingNavbarComponent', () => {
  let component: FloatingNavbarComponent;
  let fixture: ComponentFixture<FloatingNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
