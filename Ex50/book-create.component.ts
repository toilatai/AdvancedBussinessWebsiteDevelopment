import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookAPIService } from '../book-api.service';
import { Book } from '../interfaces/Book';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent {
  book = new Book();
  errMessage: string = '';
  successMessage: string = '';

  constructor(private _service: BookAPIService, private router: Router) { }

  postBook(): void {
    if (!this.validateForm()) {
      this.errMessage = 'Please fill all required fields!';
      return;
    }

    this._service.postBook(this.book).subscribe({
      next: (data) => {
        this.successMessage = 'Book created successfully!';
        this.errMessage = '';
        setTimeout(() => {
          this.router.navigate(['/book-list']);
        }, 1500);
      },
      error: (err) => {
        this.errMessage = 'Error creating book: ' + err.message;
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
