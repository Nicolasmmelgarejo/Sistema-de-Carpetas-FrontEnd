import { TestBed } from '@angular/core/testing';

import { NoAdminAuthGuard } from './no-admin-auth.guard';

describe('NoAdminAuthGuard', () => {
  let guard: NoAdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAdminAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
