import { Routes } from '@angular/router';
import { FashionHomeComponent } from './components/fashion-home/fashion-home.component';

export const routes: Routes = [
  { path: '', component: FashionHomeComponent },
  { path: '**', redirectTo: '' }
];
