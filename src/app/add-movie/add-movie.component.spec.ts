import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovieComponent } from './add-movie.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppServiceService } from '../app-service.service';
import { Router } from '@angular/router';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let toastrService: ToastrService;
  let appService: AppServiceService;
  let router: Router;

  beforeEach(async () => {
    const toastrServiceStub = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    const appServiceStub = {
      addMovie: jasmine.createSpy('addMovie').and.returnValue(of({})), // Mock successful response
    };

    const routerStub = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [AddMovieComponent],
      providers: [
        FormBuilder,
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: AppServiceService, useValue: appServiceStub },
        { provide: Router, useValue: routerStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    toastrService = TestBed.inject(ToastrService);
    appService = TestBed.inject(AppServiceService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should submit a movie successfully', () => {

    component.form.setValue({ movieName: 'Test Movie', theatreName: 'Test Theatre' });


    component.onSubmit();

   
    expect(appService.addMovie).toHaveBeenCalledWith({
      movieName: 'Test Movie',
      theatreName: 'Test Theatre',
    });
    expect(toastrService.success).toHaveBeenCalledWith('Movie Added Successfully.', 'Success');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });


});
