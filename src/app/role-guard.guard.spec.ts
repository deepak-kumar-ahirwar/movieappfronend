import { TestBed } from '@angular/core/testing';

import { RoleGuardGuard } from './role-guard.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('RoleGuardGuard', () => {
  let guard: RoleGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
    });
    guard = TestBed.inject(RoleGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
