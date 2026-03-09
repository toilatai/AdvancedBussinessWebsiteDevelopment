import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fashion {
  _id?: string;
  title: string;
  details: string;
  thumbnail: string;
  style: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = '/api/fashions'; // proxy to http://localhost:4000/fashions

  constructor(private http: HttpClient) {}

  getFashions(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(this.apiUrl);
  }

  getFashionsByStyle(style: string): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}?style=${style}`);
  }

  getFashion(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/${id}`);
  }
}
