import { Routes } from '@angular/router';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';
import { FashionViewComponent } from './fashion-view/fashion-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/fashions', pathMatch: 'full' },
  { path: 'fashions', component: FashionListComponent },
  { path: 'fashions/add', component: FashionDetailComponent },
  { path: 'fashions/edit/:id', component: FashionDetailComponent },
  { path: 'fashions/view/:id', component: FashionViewComponent }
];