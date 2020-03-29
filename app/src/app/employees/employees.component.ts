import { Component, OnInit } from '@angular/core';
//import { EMPLOYEES } from '../mock-employees';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  EmployeeInfoForm;
  
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService) {
    this.EmployeeInfoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ''
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  selectedEmployee: Employee;

  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  onSelect(task: Employee): void {
    this.selectedEmployee = task;
  }

  sortEmployeeID(): void{
    for (let i = 0; i < this.employees.length; i++) {
      this.employees[i].id = i + 1;     
    }
  }

  onCreate(employeeDetails) {
    this.employees.push({name: employeeDetails.name, id: this.employees.length + 1, department: null});
    this.EmployeeInfoForm.reset();
    this.sortEmployeeID();
  }

  onDelete(employee: Employee) {
    if (this.employees.includes(employee)){
      this.employees.splice(employee.id - 1, 1);
    }
    console.log('Deleted task')
    this.selectedEmployee = null;
    this.sortEmployeeID();
  }

}
