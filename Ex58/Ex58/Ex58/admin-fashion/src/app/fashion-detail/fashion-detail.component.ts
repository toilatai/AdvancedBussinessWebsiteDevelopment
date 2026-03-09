import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionService, Fashion } from '../fashion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-fashion-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  template: `
    <div class="detail-container">
      <h2>{{ isEdit ? 'Edit' : 'Add' }} Fashion</h2>
      <form (ngSubmit)="save()" class="fashion-form">
        <div class="form-group">
          <label>Title</label>
          <input [(ngModel)]="fashion.title" name="title" required class="form-control" />
        </div>
        <div class="form-group">
          <label>Style</label>
          <select [(ngModel)]="fashion.style" name="style" required class="form-control">
            <option value="Street Style">Street Style</option>
            <option value="Formal">Formal</option>
            <option value="Casual">Casual</option>
          </select>
        </div>
        <div class="form-group">
          <label>Thumbnail URL</label>
          <input [(ngModel)]="fashion.thumbnail" name="thumbnail" required class="form-control" />
          <img *ngIf="fashion.thumbnail" [src]="fashion.thumbnail" style="max-width: 200px; margin-top: 10px;" />
        </div>
        <div class="form-group">
          <label>Details</label>
          <quill-editor [(ngModel)]="fashion.details" name="details"></quill-editor>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn-save">{{ isEdit ? 'Update' : 'Add' }}</button>
          <button type="button" class="btn-cancel" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .detail-container { padding: 20px; background: #f5f5f5; border-radius: 8px; max-width: 800px; margin: 0 auto; }
    .fashion-form { background: white; padding: 20px; border-radius: 8px; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 600; }
    .form-control { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
    .form-actions { display: flex; gap: 10px; margin-top: 20px; }
    .btn-save { background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-cancel { background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-save:hover { background: #218838; }
    .btn-cancel:hover { background: #5a6268; }
  `]
})
export class FashionDetailComponent implements OnInit {
  fashion: Fashion = { title: '', style: '', thumbnail: '', details: '' };
  isEdit = false;

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.fashionService.getFashion(id).subscribe(data => this.fashion = data);
    }
  }

  save() {
    if (this.isEdit) {
      this.fashionService.updateFashion(this.fashion._id!, this.fashion).subscribe(() => this.router.navigate(['/fashions']));
    } else {
      this.fashionService.createFashion(this.fashion).subscribe(() => this.router.navigate(['/fashions']));
    }
  }

  cancel() {
    this.router.navigate(['/fashions']);
  }
}
