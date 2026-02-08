import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookAPIService } from '../book-api.service';
import { Book } from '../interfaces/Book';

@Component({
  selector: 'app-book-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  book = new Book();
  errMessage: string = '';
  successMessage: string = '';
  bookId: string = '';

  constructor(
    private _service: BookAPIService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      if (this.bookId) {
        this.loadBook(this.bookId);
      }
    });
  }

  loadBook(id: string): void {
    this._service.getBook(id).subscribe({
      next: (data) => {
        this.book = data;
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = 'Error loading book: ' + err.message;
      }
    });
  }

  putBook(): void {
    if (!this.validateForm()) {
      this.errMessage = 'Please fill all required fields!';
      return;
    }

    this._service.putBook(this.book).subscribe({
      next: (data) => {
        this.successMessage = 'Book updated successfully!';
        this.errMessage = '';
        setTimeout(() => {
          this.router.navigate(['/book-list']);
        }, 1500);
      },
      error: (err) => {
        this.errMessage = 'Error updating book: ' + err.message;
        this.successMessage = '';
      }
    });
  }

  validateForm(): boolean {
    return this.book.BookId.trim() !== '' &&
      this.book.BookName.trim() !== '' &&
      this.book.Price > 0;
  }

  cancel(): void {
    this.router.navigate(['/book-list']);
  }
}
