import { TestBed } from '@angular/core/testing';

import { HoverEffectService } from './hover-effect.service';

describe('HoverEffectService', () => {
  let service: HoverEffectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoverEffectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
