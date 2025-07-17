import { Component } from '@angular/core';
import { TmdbService } from '../../services/tmdb.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search',
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
 searchQuery: string = '';
  results: any[] = [];
  isLoading = false;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.search();
      }
    });
  }

  search() {
    if (!this.searchQuery.trim()) return;
    
    this.isLoading = true;
    this.results = [];
    
    this.tmdbService.searchMulti(this.searchQuery, this.currentPage).subscribe({
      next: (data: any) => {
        this.results = data.results;
        this.totalPages = data.total_pages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.isLoading = false;
      }
    });
  }

  onSearchSubmit() {
    this.currentPage = 1;
    this.search();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.search();
  }
  getPages(): number[] {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;
  
  if (endPage > this.totalPages) {
    endPage = this.totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
}
}
