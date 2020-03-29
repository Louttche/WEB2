import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from '../task.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  UpdateForm;
  
  employee$: Observable<Employee>;
  currentEmployee: Employee;
  employees: Employee[];

  constructor(private formBuilder: FormBuilder,
    private taskService: TaskService, 
    private route: ActivatedRoute,
    private employeeService: EmployeeService) { 

      this.UpdateForm = this.formBuilder.group({
        name: '', //[Validators.required]
        department: null
      }); }

  ngOnInit(): void {
   this.getEmployees();
   this.employee$ = this.route.paramMap.pipe(switchMap((params: ParamMap) =>
      this.employeeService.getEmployee(params.get('id')))
    );
    this.employee$.subscribe(value => this.currentEmployee = value);
  }

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

}
