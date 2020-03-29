import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Employee } from '../employee';
import { TaskService } from '../task.service';
//import { EMPLOYEES } from '../mock-employees';
import { DepartmentService } from '../department.service';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})

export class TaskDetailsComponent implements OnInit {
  UpdateForm;
  
  task$: Observable<Task>;
  currentTask: Task;
  tasks: Task[];
  employees: Employee[];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService, 
    private route: ActivatedRoute,
    private employeeService: EmployeeService)
    {
      this.UpdateForm = this.formBuilder.group({
        name: '', //[Validators.required]
        description: '',
        department: null,
        employees: null,
        deadline: null
      });
    }

  ngOnInit(): void {
    this.getTasks();
    this.task$ = this.route.paramMap.pipe(switchMap((params: ParamMap) =>
      this.taskService.getTask(params.get('id')))
    );
    this.task$.subscribe(value => this.currentTask = value);
  }

  getTasks(): void{
    this.taskService.getTasks().subscribe(tasks => tasks = tasks);
  }

  updateEmployees(value){
    console.log(value + " wow");
  }
}
