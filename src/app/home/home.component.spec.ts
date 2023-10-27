import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthServiceService } from '../auth-service.service';
import { AppServiceService } from '../app-service.service';
import { of } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let toastrService: ToastrService;
  let authService: AuthServiceService;
  let appService: AppServiceService;

  const mockAuthService = {
    user: of({
      user: {
        roleName: 'admin', // Mock the user's role
      },
    }),
  };

  const mockAppService = {
    getAllMovie: jasmine.createSpy('getAllMovie').and.returnValue(
      of([
        {
          movieId: 1,
          movieName: 'Movie 1',
          theatreName: 'Theatre 1',
          seatAvailable: 50,
        },
        {
          movieId: 2,
          movieName: 'Movie 2',
          theatreName: 'Theatre 2',
          seatAvailable: 60,
        },
      ])
    ),
    searchMovieByName: jasmine.createSpy('searchMovieByName').and.returnValue(
      of([
        {
          movieId: 1,
          movieName: 'Movie 1',
          theatreName: 'Theatre 1',
          seatAvailable: 50,
        },
      ])
    ),
    deleteMovie: jasmine.createSpy('deleteMovie').and.returnValue(of({})),
  };

  const mockRouter = {
    events: of(new NavigationEnd(0, 'http://localhost:4200/home', 'http://localhost:4200/home')),
  };



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        FormBuilder,
        ToastrService,
        { provide: AuthServiceService, useValue: mockAuthService },
        { provide: AppServiceService, useValue: mockAppService },
        { provide: Router, useValue: mockRouter },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    toastrService = TestBed.inject(ToastrService);
    authService = TestBed.inject(AuthServiceService);
    appService = TestBed.inject(AppServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should search for movies by name', () => {
    component.onsearch('Movie 1');
    expect(appService.searchMovieByName).toHaveBeenCalledWith('Movie 1');
    expect(component.movies.length).toBe(1);
  });

  it('should reset properties and load all data', () => {
    component.resetProperties();
    expect(appService.getAllMovie).toHaveBeenCalled();
    expect(component.movies.length).toBeGreaterThan(0);
  });

  it('should delete a movie', () => {
    const movieIdToDelete = 1;
    spyOn(toastrService, 'success'); // Spy on ToastrService success method
    component.deleteItem(movieIdToDelete);
    expect(appService.deleteMovie).toHaveBeenCalledWith(movieIdToDelete);
    expect(toastrService.success).toHaveBeenCalledWith('Successfully Deleted');
  });

});
