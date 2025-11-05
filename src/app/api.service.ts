import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // ✅ Get all patron categories
  getPatronCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/v1/library/patron/categories-Management`);
  }

  // ✅ Add a new patron category
  addPatronCategory(category: { name: string; description: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/library/patron/categories-Management`, category);
  }
}
