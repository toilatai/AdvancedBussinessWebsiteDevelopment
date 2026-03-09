import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FashionService, Fashion } from '../../fashion.service';

@Component({
  selector: 'app-fashion-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fashion-home">
      <header class="hero">
        <div class="hero-content">
          <h1>✨ Fashion Collection</h1>
          <p>Discover the Latest Styles & Trends</p>
        </div>
      </header>

      <div class="container">
        <div class="search-container">
          <input type="text" [(ngModel)]="searchKeyword" placeholder="🔍 Search fashions..." class="search-input">
          <select [(ngModel)]="selectedStyle" (change)="onStyleChange()" class="style-select">
            <option value="">All Styles</option>
            <option *ngFor="let style of styles" [value]="style">{{ style }}</option>
          </select>
          <button (click)="search()" class="btn-search">Search</button>
          <button (click)="resetSearch()" class="btn-reset">Reset</button>
        </div>

        <div *ngIf="fashions.length === 0" class="no-data">
          <p>😔 No fashions found. Try adjusting your search criteria.</p>
        </div>

        <div *ngFor="let groupedStyle of groupedFashions | keyvalue" class="style-section">
          <h2 class="style-title">{{ groupedStyle.key }}</h2>
          <div class="gallery">
            <div *ngFor="let fashion of groupedStyle.value" class="fashion-card" (click)="openModal(fashion)">
              <img [src]="fashion.thumbnail" [alt]="fashion.title" class="card-image">
              <div class="fashion-info">
                <h3>{{ fashion.title }}</h3>
                <p class="style-badge">{{ fashion.style }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="modal" [class.active]="modalOpen" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <span class="close" (click)="closeModal()">&times;</span>
          <div *ngIf="selectedFashion" class="modal-body">
            <img [src]="selectedFashion.thumbnail" [alt]="selectedFashion.title" class="modal-image">
            <div class="modal-info">
              <h3>{{ selectedFashion.title }}</h3>
              <p class="style-info"><strong>Style:</strong> <span class="badge">{{ selectedFashion.style }}</span></p>
              <p class="date-info"><strong>Created:</strong> {{ selectedFashion.createdAt | date: 'short' }}</p>
              <div class="details-section">
                <h4>Details:</h4>
                <div class="details-content" [innerHTML]="selectedFashion.details"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .fashion-home {
      min-height: 100vh;
      background: #f5f5f5;
    }

    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px 20px;
      text-align: center;
    }

    .hero-content h1 {
      margin: 0;
      font-size: 3em;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .hero-content p {
      margin: 0;
      font-size: 1.3em;
      opacity: 0.9;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .search-container {
      display: flex;
      gap: 10px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .search-input, .style-select {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
      flex: 1;
      min-width: 150px;
    }

    .search-input:focus, .style-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .btn-search, .btn-reset {
      padding: 12px 24px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }

    .btn-search {
      background: #667eea;
      color: white;
    }

    .btn-search:hover {
      background: #5568d3;
    }

    .btn-reset {
      background: #ccc;
      color: #333;
    }

    .btn-reset:hover {
      background: #aaa;
    }

    .no-data {
      text-align: center;
      padding: 60px 20px;
      color: #999;
      font-size: 1.2em;
    }

    .style-section {
      margin-bottom: 50px;
    }

    .style-title {
      font-size: 2em;
      color: #333;
      text-transform: uppercase;
      letter-spacing: 2px;
      border-bottom: 3px solid #667eea;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    .fashion-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s;
    }

    .fashion-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .card-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      display: block;
    }

    .fashion-info {
      padding: 15px;
    }

    .fashion-info h3 {
      margin: 0 0 8px 0;
      color: #333;
      font-size: 1.1em;
    }

    .style-badge {
      margin: 0;
      color: #667eea;
      font-size: 0.9em;
      font-weight: 600;
    }

    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      overflow-y: auto;
    }

    .modal.active {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      overflow: auto;
      max-width: 900px;
      max-height: 90vh;
      width: 95%;
      position: relative;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .close {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 2em;
      cursor: pointer;
      color: #999;
      z-index: 10;
    }

    .close:hover {
      color: #333;
    }

    .modal-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      padding: 30px;
    }

    .modal-image {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    .modal-info h3 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 1.8em;
    }

    .style-info, .date-info {
      margin-bottom: 15px;
    }

    .badge {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.85em;
      font-weight: bold;
    }

    .details-section h4 {
      margin-top: 20px;
      margin-bottom: 12px;
      color: #333;
    }

    .details-content {
      line-height: 1.6;
      color: #555;
    }

    .details-content p {
      margin-bottom: 12px;
    }

    @media (max-width: 768px) {
      .hero-content h1 {
        font-size: 2em;
      }

      .gallery {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }

      .modal-body {
        grid-template-columns: 1fr;
        padding: 20px;
      }

      .search-container {
        flex-direction: column;
      }

      .search-input, .style-select, .btn-search, .btn-reset {
        width: 100%;
      }
    }
  `]
})
export class FashionHomeComponent implements OnInit {
  fashions: Fashion[] = [];
  groupedFashions: { [key: string]: Fashion[] } = {};
  styles: string[] = [];
  selectedStyle = '';
  searchKeyword = '';
  modalOpen = false;
  selectedFashion?: Fashion;
  loading = false;

  constructor(private fashionService: FashionService) {}

  ngOnInit() {
    this.loadFashions();
  }

  loadFashions() {
    this.loading = true;
    this.fashionService.getFashions().subscribe({
      next: (data) => {
        this.fashions = data;
        this.groupFashionsByStyle();
        this.extractStyles();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading fashions:', err);
        this.loading = false;
      }
    });
  }

  groupFashionsByStyle() {
    this.groupedFashions = {};
    this.fashions.forEach(fashion => {
      const style = fashion.style || 'Other';
      if (!this.groupedFashions[style]) {
        this.groupedFashions[style] = [];
      }
      this.groupedFashions[style].push(fashion);
    });
  }

  extractStyles() {
    this.styles = Object.keys(this.groupedFashions).sort();
  }

  onStyleChange() {
    if (this.selectedStyle) {
      this.fashionService.getFashionsByStyle(this.selectedStyle).subscribe({
        next: (data) => {
          this.fashions = data;
          this.groupFashionsByStyle();
        },
        error: (err) => console.error('Error filtering:', err)
      });
    } else {
      this.loadFashions();
    }
  }

  search() {
    if (this.searchKeyword.trim()) {
      const filtered = this.fashions.filter(f =>
        f.title.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        f.details.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
      this.groupedFashions = {};
      filtered.forEach(fashion => {
        const style = fashion.style || 'Other';
        if (!this.groupedFashions[style]) {
          this.groupedFashions[style] = [];
        }
        this.groupedFashions[style].push(fashion);
      });
    } else {
      this.groupFashionsByStyle();
    }
  }

  resetSearch() {
    this.searchKeyword = '';
    this.selectedStyle = '';
    this.loadFashions();
  }

  openModal(fashion: Fashion) {
    this.selectedFashion = fashion;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalOpen = false;
    this.selectedFashion = undefined;
    document.body.style.overflow = 'auto';
  }
}
