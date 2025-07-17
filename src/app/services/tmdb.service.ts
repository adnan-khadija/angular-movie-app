import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieResponse, TvShowResponse } from '../models/movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = '1918ae8576b4d81671307bcf7859df95';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
  }

  getTrendingMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`);
  }

  getFeaturedMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}`);
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getPopularTvShows(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}`);
  }
getTvShowDetails(id: number) {
  return this.http.get(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}`);
}
 
  getMovieVideos(id: number) {
  return this.http.get(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`);
}

getTvShowVideos(id: number) {
  return this.http.get(`${this.baseUrl}/tv/${id}/videos?api_key=${this.apiKey}`);
}
searchMovies(query: string, page: number = 1) {
  return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`);
}

searchMulti(query: string, page: number = 1) {
  return this.http.get(`${this.baseUrl}/search/multi?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${page}`);
}

  
}