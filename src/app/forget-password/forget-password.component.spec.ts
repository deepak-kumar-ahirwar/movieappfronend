import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordComponent } from './forget-password.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;
  let fixture: ComponentFixture<ForgetPasswordComponent>;
  let authService: AuthServiceService;
  let toastrService: ToastrService;

  const mockAuthService = {
    forgot: jasmine.createSpy('forgot').and.returnValue(of({})),
    updatePassword: jasmine.createSpy('updatePassword').and.returnValue(of({})),
  };

  const mockToastrService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ForgetPasswordComponent],
      providers: [
        FormBuilder,
        { provide: AuthServiceService, useValue: mockAuthService },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthServiceService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find username', () => {
    component.forgetForm.patchValue({
      username: 'testuser',
    });

    component.findUserName();

    expect(mockAuthService.forgot).toHaveBeenCalledWith('testuser');
    expect(mockToastrService.success).toHaveBeenCalledWith('User Name Found.', 'Success');
    expect(component.isUsernameFind).toBeTrue();
  })

  it('should reset form and error message', () => {
    component.submitted = true;
    component.errorMessage = 'Some error message';

    component.onReset();

    expect(component.submitted).toBeFalse();
    expect(component.errorMessage).toBe('');
  });



});
