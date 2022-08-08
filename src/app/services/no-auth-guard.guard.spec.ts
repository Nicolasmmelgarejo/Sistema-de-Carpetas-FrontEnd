import { TestBed } from '@angular/core/testing';

import { NoAuthGuardGuard } from './no-auth-guard.guard';

describe('NoAuthGuardGuard', () => {
  let guard: NoAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
