import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthServiceService]
    });
    service = TestBed.inject(AuthServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new customer', () => {
    const newUser = { username: 'testuser', password: 'password' };

    service.createCusomer(newUser).subscribe(response => {
      expect(response).toBeDefined();

    });

    const req = httpMock.expectOne(`${service.serviceUrl}register`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });


  it('should log in a customer', () => {
    const userCredentials = { username: 'testuser', password: 'password' };

    service.loginCustomer(userCredentials).subscribe(response => {
      expect(response).toBeDefined();
    });

    const req = httpMock.expectOne(`${service.serviceUrl}login`);
    expect(req.request.method).toBe('POST');
    req.flush({}); 
  });


});
