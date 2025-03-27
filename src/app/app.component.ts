import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, MatProgressSpinnerModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  // genres: string[] = ['Fiction', 'PHILOSOPHY', 'DRAMA', 'HUMOUR', 'ADVENTURE', 'POLITICS'];
  // selectedGenre: string = '';
  // books: any[] = [];
  // loading: boolean = false;
  // hasMore: boolean = true;
  // nextPage: string | null = null;
  // search: string = '';

  // constructor(private snackBar: MatSnackBar) {}

  // ngOnInit(): void {}

  // fetchBooks(genre: string, page: number = 1, query: string = ''): void {
  //   this.loading = true;
  //   const searchParam = query ? `&search=${encodeURIComponent(query)}` : '';
  //   const url = `http://skunkworks.ignitesol.com:8000/books?topic=${genre}&page=${page}${searchParam}`;

  //   axios.get(url)
  //     .then((response) => {
  //       const newBooks = response.data.results.filter((book: any) => 
  //         book.formats['image/jpeg'] && 
  //         (book.formats['text/html'] || book.formats['application/pdf'] || book.formats['text/plain'])
  //       ).map((book: any) => ({
  //         ...book,
  //         cover_url: book.formats['image/jpeg']
  //       }));

  //       this.books = page === 1 ? newBooks : [...this.books, ...newBooks];
  //       this.nextPage = response.data.next;
  //       this.hasMore = !!response.data.next;
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       this.snackBar.open('Failed to load books. Please check your internet connection.', 'Close', { duration: 3000 });
  //     })
  //     .finally(() => {
  //       this.loading = false;
  //     });
  // }

  // handleGenreClick(genre: string): void {
  //   this.selectedGenre = genre;
  //   this.books = [];
  //   this.fetchBooks(genre);
  // }

  // handleSearch(event: any): void {
  //   this.search = event.target.value;
  //   this.books = [];
  //   this.fetchBooks(this.selectedGenre, 1, this.search);
  // }

  // handleBookClick(book: any): void {
  //   const formats = ['text/html', 'application/pdf', 'text/plain'];
  //   const availableFormat = formats.find((format: string) => book.formats[format]);

  //   if (availableFormat) {
  //     window.open(book.formats[availableFormat], '_blank');
  //   } else {
  //     this.snackBar.open('No viewable version available', 'Close', { duration: 3000 });
  //   }
  // }

  // loadMoreBooks(): void {
  //   if (this.nextPage && !this.loading) {
  //     const urlParams = new URLSearchParams(this.nextPage.split('?')[1]);
  //     const page = parseInt(urlParams.get('page') || '1', 10);
  //     this.fetchBooks(this.selectedGenre, page, this.search);
  //   }
  // }

  // getAuthors(book: any): string {
  //   return book.authors.map((author: any) => author.name).join(', ');
  // }
}
