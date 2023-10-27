import { Component } from '@angular/core';
import { AppServiceService } from '../app-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  roleName!: string;
  movies: Movie[] = [];
  constructor(private authService: AuthServiceService, private toastr: ToastrService, private appService: AppServiceService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.roleName = this.authService.user.value?.user.roleName;
    this.loadData();


  }

  loadData(): void {

    this.appService.getAllMovie().subscribe(data => {

      console.log(data);
      this.movies = data;
    })
  }

  resetProperties() {
    this.appService.getAllMovie().subscribe(data => {
      console.log(data);
      this.movies = data;
    })
  }


  onsearch(id: any): void {

    console.log(id);
    if (id) {
      this.appService.searchMovieByName(id).subscribe(data => {

        this.movies = data;

      });

      console.log(this.movies);


    } else {
      this.loadData();
    }



  }


  deleteItem(id: any): void {

    this.appService.deleteMovie(id).subscribe(data => {
      const index = this.movies.findIndex(x => x.movieId = id);
      this.movies.splice(index, 1)
      console.log(data);
      this.toastr.success("Successfully Deleted");

    });

  }


}

interface Movie {
  movieId: number;
  movieName: string,
  theatreName: string,
  seatAvailable: number

}

