import { Component, OnInit } from '@angular/core';
import { TvShow } from '../../models/movie.model';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tv-show-list',
  imports: [CommonModule,DatePipe,DecimalPipe,RouterModule],
  templateUrl: './tv-show-list.html',
  styleUrl: './tv-show-list.css'
})
export class TvShowList implements OnInit {
 tvShows: TvShow[] = [];
  isLoading = true;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit(): void {
    this.loadTvShows();
  }

  loadTvShows() {
    this.tmdbService.getPopularTvShows().subscribe({
      next: (data: any) => {
        this.tvShows = data.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading TV shows:', err);
        this.isLoading = false;
      }
    });
  }
}
