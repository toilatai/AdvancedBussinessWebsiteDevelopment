import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FashionService, Fashion } from '../fashion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fashion-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fashion-list-container">
      <div class="list-header">
        <h2>Fashion List</h2>
        <button class="btn-add" (click)="addNew()">+ Add New Fashion</button>
      </div>
      <div class="table-wrapper">
        <table class="fashion-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Style</th>
              <th>Thumbnail</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let fashion of fashions" class="fashion-row">
              <td class="title-col">{{ fashion.title }}</td>
              <td class="style-col"><span class="badge">{{ fashion.style }}</span></td>
              <td class="thumb-col"><img [src]="fashion.thumbnail" alt="{{ fashion.title }}" /></td>
              <td class="date-col">{{ (fashion.createdAt | date: 'short') }}</td>
              <td class="actions-col">
                <button class="btn-action btn-view" (click)="view(fashion._id!)">View</button>
                <button class="btn-action btn-edit" (click)="edit(fashion._id!)">Edit</button>
                <button class="btn-action btn-delete" (click)="delete(fashion._id!)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="fashions.length === 0" class="no-data">
        <p>No fashions found. <a (click)="addNew()" class="link">Create one</a></p>
      </div>
    </div>
  `,
  styles: [`
    .fashion-list-container {
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
    }
    
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .list-header h2 {
      margin: 0;
      color: #333;
    }
    
    .btn-add {
      background: #28a745;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: bold;
    }
    
    .btn-add:hover {
      background: #218838;
    }
    
    .table-wrapper {
      background: white;
      border-radius: 8px;
      overflow-x: auto;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .fashion-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .fashion-table thead {
      background: #333;
      color: white;
    }
    
    .fashion-table th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #ddd;
    }
    
    .fashion-table td {
      padding: 12px;
      border-bottom: 1px solid #eee;
    }
    
    .fashion-row:hover {
      background: #f9f9f9;
    }
    
    .title-col {
      font-weight: 500;
      color: #333;
    }
    
    .style-col {
      text-align: center;
    }
    
    .badge {
      display: inline-block;
      background: #007bff;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }
    
    .thumb-col img {
      max-width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 4px;
    }
    
    .date-col {
      font-size: 12px;
      color: #666;
    }
    
    .actions-col {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .btn-action {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.3s;
    }
    
    .btn-view {
      background: #007bff;
      color: white;
    }
    
    .btn-view:hover {
      background: #0056b3;
    }
    
    .btn-edit {
      background: #ffc107;
      color: #333;
    }
    
    .btn-edit:hover {
      background: #e0a800;
    }
    
    .btn-delete {
      background: #dc3545;
      color: white;
    }
    
    .btn-delete:hover {
      background: #c82333;
    }
    
    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    
    .link {
      color: #007bff;
      cursor: pointer;
      text-decoration: underline;
    }
    
    .link:hover {
      color: #0056b3;
    }
  `]
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];

  constructor(private fashionService: FashionService, private router: Router) {}

  ngOnInit() {
    this.loadFashions();
  }

  loadFashions() {
    this.fashionService.getFashions().subscribe(data => this.fashions = data);
  }

  addNew() {
    this.router.navigate(['/fashions/add']);
  }

  view(id: string) {
    this.router.navigate(['/fashions/view', id]);
  }

  edit(id: string) {
    this.router.navigate(['/fashions/edit', id]);
  }

  delete(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.fashionService.deleteFashion(id).subscribe(() => this.loadFashions());
    }
  }
}