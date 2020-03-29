import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeJson = 'assets/employees.json';

  constructor(private http: HttpClient) { }
 
  getEmployees(){
    return this.http.get<Employee[]>(this.employeeJson);
  }

  getEmployee(id: number | string){
    return this.getEmployees().pipe(
      map((employees: Employee[]) => employees.find(employee => employee.id === +id)
      )
    );
}
}
