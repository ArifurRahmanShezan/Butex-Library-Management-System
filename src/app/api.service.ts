import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://192.168.30.234:8080';

  constructor(private http: HttpClient) { }

  // ✅ Get all patron categories
  getPatronCategories(): Observable<{ status: string; payload: any[] }> {
    return this.http.get<{ status: string; payload: any[] }>(
      `${this.baseUrl}/api/v1/library/patron-categories`
    );
  }


  // ✅ Add a new patron category
  addPatronCategory(category: { name: string; description: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/library/patron-categorie-add`, category);
  }

  deletePatronCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/v1/library/patron-categorie-delete/${id}`);
  }

  updatePatronCategory(id: number, category: { name: string; description: string }): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/v1/library/patron-categorie-update/${id}`, category);
  }




  // ✅ Get all patron privileges
  getPatronPrivileges(): Observable<{ status?: string; payload: any[] }> {
    return this.http.get<{ status?: string; payload: any[] }>(
      `${this.baseUrl}/api/v1/library/patron/privileges`
    );
  }


  // add privillege
  setPatronPrivileges(data: {
    patronCategory: { id: number },
    loanPeriodDays: number,
    maxRenewals: number,
    maxItemsOnLoan: number
  }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/v1/library/patron/privileges-Management`,
      data
    );
  }

  deletePatronPrivileges(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/v1/library//patron/privileges/${id}`);
  }




  //patrone course
  // ✅ Get all courses (API returns array directly)
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/v1/library/patron/courses`);
  }

  // ✅ Add a new course
  addCourse(course: {
    name: string;
    code: string;
    departmentId: number;
    description: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/v1/library/patron/course`,
      course
    );
  }

  // ✅ Add new patron (the endpoint you asked for)
  addPatron(patron: {
    libraryId: string;
    name: string;
    email: string;
    patronCategory: { id: number };
    department: { id: number };
    active: boolean;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/api/v1/library/patron-Management`,
      patron
    );
  }

  // 🧍‍♂️ Get all Library Patrons
  getPatrons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/v1/library/patrons`);
  }
  deletePatron(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/v1/library/patron-delete/${id}`);
  }

  updatePatron(id: number, patron: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/v1/library/patron-update/${id}`, patron);
  }




  // ✅ GET all templates
  getTemplates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/v1/library/cataloging/templates`);
  }

  // ✅ POST create a new template
  createTemplate(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/v1/library/cataloging/templates`, data);
  }



  // ✅ POST catalog record
  addCatalogRecord(record: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/library/cataloging/records`, record);
  }


  // ✅ GET all bibliographic records
  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/v1/library/cataloging/records`);
  }

  // ✅ POST new catalog item
  addCatalogItem(item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/library/cataloging/items`, item);
  }

  getCatalogItem(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/v1/library/cataloging/queue`);
  }


}








