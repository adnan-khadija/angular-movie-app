import { Routes } from '@angular/router';
import path from 'path';
import { MovieList } from './components/movie-list/movie-list';
import { Home } from './components/home/home';
import { TvShowList } from './components/tv-show-list/tv-show-list';
import { MediaDetail } from './components/media-detail/media-detail';
import { Search } from './components/search/search';

export const routes: Routes = [
   
   {
    path:'',
    component:Home
   },
    { 
        path: 'movies', 
        component: MovieList 
      },
      {
        path:'tv-shows',
        component:TvShowList
      },
{
  path: 'movies/:id',
  component: MediaDetail,
  title: 'Movie Details'
},
{
  path: 'tv-shows/:id',
  component: MediaDetail,
  title: 'TV Show Details'
},
{ 
  path: 'search', 
  component: Search,
  title: 'Search'
}
];
