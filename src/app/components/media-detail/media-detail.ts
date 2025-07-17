import { Component } from '@angular/core';
import { Media } from '../../models/movie.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-media-detail',
  imports: [CommonModule, DatePipe, DecimalPipe,RouterModule],
  templateUrl: './media-detail.html',
  styleUrl: './media-detail.css'
})
export class MediaDetail {
media!: Media;
  isLoading = true;
  videoUrl?: SafeResourceUrl;
  isMovie: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isMovie = this.route.snapshot.url[0].path === 'movies';
      this.loadMediaDetails(params['id']);
    });
  }

  loadMediaDetails(id: number) {
    const mediaObservable = this.isMovie 
      ? this.tmdbService.getMovieDetails(id) 
      : this.tmdbService.getTvShowDetails(id);

    mediaObservable.subscribe({
      next: (data: any) => {
        this.media = data;
        this.loadTrailer(data.id);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading media:', err);
        this.isLoading = false;
      }
    });
  }

  loadTrailer(id: number) {
    const videoObservable = this.isMovie
      ? this.tmdbService.getMovieVideos(id)
      : this.tmdbService.getTvShowVideos(id);

    videoObservable.subscribe({
      next: (data: any) => {
        const trailer = data.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) {
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${trailer.key}?autoplay=0`
          );
        }
      }
    });
  }

  getRuntime(): string {
    if (this.isMovie && this.media.runtime) {
      const hours = Math.floor(this.media.runtime / 60);
      const minutes = this.media.runtime % 60;
      return `${hours}h ${minutes}m`;
    }
    if (!this.isMovie && this.media.episode_run_time?.length) {
      return `${this.media.episode_run_time[0]}m/ep`;
    }
    return 'N/A';
  }

  getTitle(): string {
    return this.isMovie ? this.media.title! : this.media.name!;
  }

  getReleaseDate(): string {
    return this.isMovie ? this.media.release_date! : this.media.first_air_date!;
  }
}
