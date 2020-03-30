import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
//import { DepartmentService } from '../department.service';
import { Department } from '../department';
//import { EmployeeService } from '../employee.service';
//import { EMPLOYEES } from '../mock-employees';
import { Task } from '../task';
import { Employee } from '../employee';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  tasks: Task[];
  employees: Employee[];
  searchText: string;
  //departments: department[];
  selectedTask: Task;
  TaskInfoForm;
  show: boolean = false;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService/*, private departmentService: DepartmentService*/) {
      this.TaskInfoForm = this.formBuilder.group({
        name: '', //[Validators.required]
        description: '',
        department: Department,
        employees: null,
        deadline: null
      });
  }

  ngOnInit(): void {
    this.getTasks();    
    //this.getDepartments();
  }

  ngDoCheck(): void {
    //console.log(this.show);
  }

  getTasks(): void{
    //this.taskService.getTasks().subscribe(tasks => this.tasks = tasks, err => console.log("error getting mock-tasks."));    

    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  /*getDepartments(): void{
    this.departmentService.getDepartments().subscribe(departments => this.departments = departments);
  }*/

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  sortTasksID(): void{
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].id = i + 1;     
    }
  }

  onCreate(taskDetails) {
    this.tasks.push({name: taskDetails.name, description: taskDetails.description, id: this.tasks.length + 1, department: /*getDepartmentByName(taskDetails.department)*/taskDetails.department, employees: taskDetails.employees, deadline: taskDetails.deadline});
    this.TaskInfoForm.reset();
    this.sortTasksID();
  }

  onDelete(task: Task) {
    if (this.tasks.includes(task)){
      this.tasks.splice(task.id - 1, 1);
    }
    console.log('Deleted task')
    this.selectedTask = null;
    this.sortTasksID();
  }

  toggle(){
    this.show = !this.show;

    if (this.show)
      document.getElementById("btn_New").textContent = 'Hide';
    else
    document.getElementById("btn_New").textContent = 'Create New Task';
  }
}