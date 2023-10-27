import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthServiceService;
  let router: Router;
  let toastrService: ToastrService;

  const mockAuthService = {
    user: new BehaviorSubject<any>({ user: { roleName: 'admin', userName: 'testuser', firstName: 'John', lastName: 'Doe' } }),
    checklogin: () => true,
    logout: () => { },
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockToastrService = {
    success: jasmine.createSpy('success'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthServiceService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authService = TestBed.inject(AuthServiceService);
    router = TestBed.inject(Router);
    toastrService = TestBed.inject(ToastrService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should initialize user data', () => {
    expect(component.roleName).toBe('admin');
    expect(component.userName).toBe('testuser');
    expect(component.name).toBe('John Doe');
    expect(component.isLoggedin).toBe(true);
  });

});
