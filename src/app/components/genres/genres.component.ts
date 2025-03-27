import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  imports: [CommonModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent {
  genres = ['Fiction', 'Drama', 'Humour', 'Politics', 'Philosophy', 'History', 'Adventure'];

  constructor(private router: Router) {}

  onGenreClick(genre: string) {
    this.router.navigate(['/books', genre]); // Pass genre as a path segment, not in an object
  }
  

  getGenreIcon(genre: string): string {
    const iconsMap: { [key: string]: string } = {
      'Fiction': 'fas fa-book-open',
      'Drama': 'fas fa-theater-masks',
      'Humour': 'fas fa-laugh',
      'Politics': 'fas fa-balance-scale',
      'Philosophy': 'fas fa-brain',
      'History': 'fas fa-landmark',
      'Adventure': 'fas fa-hiking'
    };
    return iconsMap[genre] || 'fas fa-book'; // Default icon
  }
}
