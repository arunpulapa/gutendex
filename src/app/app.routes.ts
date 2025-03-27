import { Routes } from '@angular/router';
import { GenresComponent } from './components/genres/genres.component';
import { BooksComponent } from './components/books/books.component';

export const routes: Routes = [
    { path: '', component: GenresComponent },
    { path: 'books/:genre', component: BooksComponent },
];
