import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { Employee } from '../employee';
//import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: Task[];
  popularTask: Task;
  //departments: Department[];
  //employees: Employee[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  ngDoCheck(): void {
    //this.popularTask = this.getMostPopularTask();
  }

  getTasks(){
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  getMostPopularTask(): Task{
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

  }

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
