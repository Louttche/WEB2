import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchText: string;
  tasks: Task[];
  departments: Department[];
  employees: Employee[];

  constructor(private taskService: TaskService, private employeeService: EmployeeService, private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.getTasks();
    this.getEmployees();
    this.getDepartments();
  }

  getTasks(){
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees);
  }

  getDepartments(){
    this.departmentService.getDepartmentsDB().subscribe(departments => this.departments = departments);
  }

  //Extra Dashboard stuff
  /*getMostPopularTask(): Task{
    let mostPopular: Task = null;

    if (this.tasks != null){
      this.tasks.forEach(t => {
        if (mostPopular == null)
          mostPopular = t;
        else if (mostPopular.employees.length < t.employees.length)
          mostPopular = t;
      });
    }

    return mostPopular;

  }*/

  /*getMostPopularDepartment(): Department{
    let mostPopular: Department = null;

    if (this.departments != null){
      this.departments.forEach(t => {
        if (mostPopular == null)
          mostPopular = t;
        else if (mostPopular.employees.length < t.employees.length)
          mostPopular = t;
      });
    }

    return mostPopular;

  }
  
  getEmployeeOfTheMonth(): Employee{
  }

  */
}
