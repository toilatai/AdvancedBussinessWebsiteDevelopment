import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookAPIService } from '../book-api.service';
import { IBook } from '../interfaces/Book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: IBook[] = [];
  errMessage: string = '';

  constructor(private _service: BookAPIService, private router: Router) {
    this.loadBooks();
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = 'Error loading books: ' + err.message;
      }
    });
  }

  createNew(): void {
    this.router.navigate(['/book-create']);
  }

  edit(bookId: string): void {
    this.router.navigate(['/book-edit', bookId]);
  }

  details(bookId: string): void {
    this.router.navigate(['/book-detail', bookId]);
  }

  delete(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this._service.deleteBook(bookId).subscribe({
        next: (data) => {
          this.books = data;
          this.errMessage = '';
          alert('Book deleted successfully!');
        },
        error: (err) => {
          this.errMessage = 'Error deleting book: ' + err.message;
        }
      });
    }
  }
}
