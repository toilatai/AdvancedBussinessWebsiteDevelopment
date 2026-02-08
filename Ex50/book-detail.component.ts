import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { BookAPIService } from '../book-api.service';
import { IBook } from '../interfaces/Book';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: IBook | null = null;
  errMessage: string = '';
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
        this.errMessage = 'Error loading book details: ' + err.message;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/book-list']);
  }
}
