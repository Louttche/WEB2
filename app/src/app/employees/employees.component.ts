import { Component, OnInit } from '@angular/core';
import { EMPLOYEES } from '../mock-employees';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees = EMPLOYEES;
  EmployeeInfoForm;
  
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.EmployeeInfoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ''
    });
  }
  ngOnInit(): void {
  }

  selectedEmployee: Employee;

  onSelect(task: Employee): void {
    this.selectedEmployee = task;
  }

  sortEmployeeID(): void{
    for (let i = 0; i < this.employees.length; i++) {
      this.employees[i].id = i + 1;     
    }
  }

  onCreate(employeeDetails) {
    this.employees.push({name: employeeDetails.name, id: this.employees.length + 1});
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

  onUpdate(employee: Employee, employeeDetails){
    var index = this.employees.findIndex(task => task === this.selectedEmployee);
    this.employees[index].name = employeeDetails.name;
    this.EmployeeInfoForm.reset();
    this.sortEmployeeID();
}

}
