export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;  

  
}


export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}


export interface TvShowResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}
export interface Media {
  id: number;
  title?: string;       // Pour les films
  name?: string;        // Pour les séries
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genres: {
    id: number;
    name: string;
  }[];
  // Champs communs
  runtime?: number;     // Pour les films
  episode_run_time?: number[]; // Pour les séries
  first_air_date?: string; // Pour les séries
  release_date?: string; // Pour les films
  status: string;
  tagline?: string;
  videos?: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };
}