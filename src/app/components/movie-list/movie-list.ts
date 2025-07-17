import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css'
})
export class MovieList implements OnInit {
    movies: Movie[] = [];
  
  constructor(private tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.tmdbService.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results;
    });
  }

}
