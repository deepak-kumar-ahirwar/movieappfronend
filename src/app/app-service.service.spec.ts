import { TestBed } from '@angular/core/testing';

import { AppServiceService } from './app-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppServiceService', () => {
  let service: AppServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppServiceService]
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AppServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all movies', () => {
    const dummyMovies = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' }
    ];

    service.getAllMovie().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne(`${service.serviceUrl}movie/all`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

  it('should add a movie', () => {
    const newMovie = { title: 'New Movie' };

    service.addMovie(newMovie).subscribe(response => {
      expect(response).toBeDefined();

    });

    const req = httpMock.expectOne(`${service.serviceUrl}movie/add`);
    expect(req.request.method).toBe('POST');
    req.flush({}); 
  });

});
