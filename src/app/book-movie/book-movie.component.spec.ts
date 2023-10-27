import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMovieComponent } from './book-movie.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../app-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookMovieComponent', () => {
  let component: BookMovieComponent;
  let fixture: ComponentFixture<BookMovieComponent>;
  let toastrService: ToastrService;
  let appService: AppServiceService;

  const mockActivatedRoute = {
    params: of({ id: 123 }), // Provide mock params
  };


  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockAppService = {
    searchMovieById: jasmine.createSpy('searchMovieById').and.returnValue(of({
      movieId: 123,
      movieName: 'Sample Movie',
      theatreName: 'Sample Theatre',
      seatAvailable: 50,
    })),
    bookTicket: jasmine.createSpy('bookTicket').and.returnValue(of({})), // Mock the service
  };

  beforeEach(async () => {



    await TestBed.configureTestingModule({
      declarations: [BookMovieComponent],
      imports: [ToastrModule.forRoot(), ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        ToastrService,
        { provide: AppServiceService, useValue: mockAppService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    toastrService = TestBed.inject(ToastrService);
    appService = TestBed.inject(AppServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should submit form and book ticket', () => {
    component.ngOnInit(); // Set movie data
    component.form.setValue({
      noOfSeats: 2,
      seatNumber: 'A1, A2',
    });

    spyOn(toastrService, 'success'); // Spy on ToastrService success method

    component.onSubmit();

    expect(mockAppService.bookTicket).toHaveBeenCalledWith(
      {
        movieName: 'Sample Movie',
        bookedSeats: 2,
        seatNumber: 'A1, A2',
      },
      123
    );

    expect(toastrService.success).toHaveBeenCalledWith(
      'Ticket Booked Successfully.',
      'Success'
    );

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });


});
