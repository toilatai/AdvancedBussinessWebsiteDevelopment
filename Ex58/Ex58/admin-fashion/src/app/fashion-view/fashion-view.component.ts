import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionService, Fashion } from '../fashion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fashion-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="view-container">
      <div *ngIf="fashion" class="fashion-detail-view">
        <div class="view-header">
          <h2>{{ fashion.title }}</h2>
          <button class="btn-back" (click)="back()">← Back</button>
        </div>
        <div class="view-content">
          <img [src]="fashion.thumbnail" [alt]="fashion.title" class="detail-image" />
          <div>
            <p><strong>Style:</strong> {{ fashion.style }}</p>
            <p><strong>Created:</strong> {{ fashion.createdAt | date: 'medium' }}</p>
            <p><strong>Details:</strong></p>
            <div [innerHTML]="fashion.details"></div>
          </div>
        </div>
      </div>
      <div *ngIf="!fashion" class="loading">
        <p>Loading...</p>
      </div>
    </div>
  `,
  styles: [`
    .view-container { padding: 20px; background: #f5f5f5; border-radius: 8px; }
    .fashion-detail-view { background: white; border-radius: 8px; overflow: hidden; }
    .view-header { display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 2px solid #eee; }
    .btn-back { background: #6c757d; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
    .btn-back:hover { background: #5a6268; }
    .view-content { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; padding: 30px; }
    .detail-image { max-width: 100%; height: auto; border-radius: 8px; }
    .loading { text-align: center; padding: 40px; }
    @media (max-width: 768px) { .view-content { grid-template-columns: 1fr; } }
  `]
})
export class FashionViewComponent implements OnInit {
  fashion?: Fashion;

  constructor(
    private fashionService: FashionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fashionService.getFashion(id).subscribe(data => this.fashion = data);
    }
  }

  back() {
    this.router.navigate(['/fashions']);
  }
}
