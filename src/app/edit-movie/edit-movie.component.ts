import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from '../app-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent {

  movie!: Movie;
  movieId!: number;


  form: FormGroup = new FormGroup({
    'movieName': new FormGroup(''),
    'theatreName': new FormGroup(''),
    'seatAvailable': new FormGroup(''),

  });


  constructor(private toastr: ToastrService, private appService: AppServiceService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {


    this.route.params.subscribe((params: any) => {
      this.movieId = params['id'];
    });


    this.getdata();

    this.form = this.fb.group({
      movieName: ['', Validators.required],
      theatreName: ['', Validators.required],
      seatAvailable: ['', Validators.required],
    });


  }

  async getdata(): Promise<void> {

    await this.appService.searchMovieById(this.movieId).subscribe(data => {
      this.movie = data;
      this.form.patchValue({
        movieName: this.movie.movieName,
        theatreName: this.movie.theatreName,
        seatAvailable: this.movie.seatAvailable,

      });
    });


  }


  onSubmit() {

    this.movie = {
      movieName: this.form.controls['movieName'].value,
      theatreName: this.form.controls['theatreName'].value,
      seatAvailable: this.form.controls['seatAvailable'].value,
    };


    this.appService.updateMovie(this.movieId,this.movie).subscribe(data => {

      this.toastr.success("Movie update Successfully.", 'Success');
      this.router.navigate(['/home']);


    }, error => {
      this.toastr.error("Something went wrong", 'Error');
    })
  }


}



interface Movie {
  movieName: string,
  theatreName: string,
  seatAvailable: number
}



