import { Injectable } from '@angular/core';
import { Department } from './department';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  apiurl = 'api/departments';                 // Our created Data can be accessed here at api/tasks
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }  //Injecting HTTP service to communicate with the data

  private handleError(error: any) {
    console.error(error);    //Created a function to handle and log errors, in case
    return throwError(error);
  }

  getDepartmentsDB(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiurl).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  getDepartmentByID (id: number): Observable<Department> {
    const url = `${this.apiurl}/${id}`;
    return this.http.get<Department>(url).pipe(
    catchError(this.handleError)
    );
    }

    addDepartment (newTask: Department): Observable<Department> {
      newTask.id=null;
      return this.http.post<Department>(this.apiurl, newTask, this.httpOptions).pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
  }

  deleteDepartment(id: number): Observable<Department> {
    const url = `${this.apiurl}/${id}`;
    return this.http.delete<Department>(url, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateDepartment(selDepartment: Department): Observable<Department>{
    const url = `${this.apiurl}/${selDepartment.id}`;
    return this.http.put<Department>(this.apiurl, selDepartment, this.httpOptions).pipe(
      map(() => selDepartment),
      catchError(this.handleError)
    );
  }

  
}