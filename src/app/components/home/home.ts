import { Component } from '@angular/core';
import { Movie, MovieResponse } from '../../models/movie.model';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieCard } from '../movie-card/movie-card';
import { Carousel } from '../carousel/carousel';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, Carousel, MovieCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
 featuredMovies: Movie[] = [];
  popularMovies: Movie[] = [];
  trendingMovies: Movie[] = [];
  isLoading = true;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
  this.tmdbService.getFeaturedMovies().subscribe((data: MovieResponse) => {
    this.featuredMovies = data.results.slice(0, 5);
    this.isLoading = false;
  });

  this.tmdbService.getPopularMovies().subscribe((data: MovieResponse) => {
    this.popularMovies = data.results.slice(0, 5);
  });

  this.tmdbService.getTrendingMovies().subscribe((data: MovieResponse) => {
    this.trendingMovies = data.results.slice(0, 5);
  });
}


  
}
