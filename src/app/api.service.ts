import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://192.168.30.234:8080';

  constructor(private http: HttpClient) {}
getPatronCategories(): Observable<{ status: string; payload: any[] }> {
  return this.http.get<{ status: string; payload: any[] }>(
    `${this.baseUrl}/api/v1/library/patron-categories`
  );
}


  // ✅ Add a new patron category
  addPatronCategory(category: { name: string; description: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/library/patron-categorie-add`, category);
  }
}
