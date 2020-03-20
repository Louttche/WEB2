import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TASKS } from '../mock-tasks';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  currentTask: Task;
  tasks = TASKS;

  constructor() { }

  ngOnInit(): void {
    //this.currentTask = this.GetTaskByID();
  }

  GetTaskByID(id: number): Task {
    return this.tasks[this.tasks.findIndex(task => task.id === id)];
  }
}
