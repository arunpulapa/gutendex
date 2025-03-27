import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  selectedGenre: string = '';
  books: any[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  hasNextPage: boolean = false;
  totalRecords: number = 0;
  searchQuery: string = '';
  loadingMore: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.selectedGenre = this.route.snapshot.paramMap.get('genre') || '';
    this.fetchBooks(true);  //  Fetch books on load
  }

  fetchBooks(reset: boolean = false) {
    if (this.loading) return;
    this.loading = true;
    this.loadingMore = this.currentPage > 1;

    if (reset) {
      this.books = [];
      this.currentPage = 1;
    }

    let params: any = {
      topic: this.selectedGenre,
      page: this.currentPage,
      search: this.searchQuery.trim() || undefined,
      mime_type: 'image/jpeg' //  Fetch only books with covers
    };

    Object.keys(params).forEach((key) => {
      if (!params[key]) delete params[key];
    });

    const queryString = new URLSearchParams(params).toString();
    const apiUrl = `https://gutendex.com/books/?${queryString}`;

    axios.get(apiUrl)
      .then((res) => {
        this.books = [...this.books, ...res.data.results.map((book: any) => ({
          ...book,
          cover_url: book.formats['image/jpeg'] || 'assets/default-cover.jpg',
          readable_format: book.formats['text/html'] || book.formats['application/pdf'] || book.formats['text/plain'] || null,
          authorNames: book.authors?.map((author: any) => author.name).join(', ') || 'Unknown Author'
        }))];

        this.totalRecords = res.data.count;
        this.hasNextPage = !!res.data.next;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        this.loading = false;
        this.loadingMore = false;
      });
  }

  //  Infinite Scroll
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.loading || !this.hasNextPage) return;

    const threshold = 100;
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;

    if (position >= height - threshold) {
      this.currentPage++;
      this.fetchBooks();
    }
  }

  //  Search Books with Debounce
  searchBooks(event: any) {
    const query = event.target.value.trim();
    this.searchQuery = query;

    clearTimeout((this as any).searchTimeout);
    (this as any).searchTimeout = setTimeout(() => {
      this.fetchBooks(true);
    }, 500);
  }

  //  Clear Search
  clearSearch(input: HTMLInputElement) {
    input.value = '';
    this.searchQuery = '';
    this.fetchBooks(true);
  }

  //  Open Book in Preferred Format
  openBook(book: any) {
    if (book.readable_format) {
      window.open(book.readable_format, '_blank');
    } else {
      alert('No viewable version available');
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
