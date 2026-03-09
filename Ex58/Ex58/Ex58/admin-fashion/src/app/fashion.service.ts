import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getFashion(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/${id}`);
  }

  createFashion(fashion: Fashion): Observable<Fashion> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Fashion>(this.apiUrl, fashion, { headers });
  }

  updateFashion(id: string, fashion: Fashion): Observable<Fashion> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Fashion>(`${this.apiUrl}/${id}`, fashion, { headers });
  }

  deleteFashion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}