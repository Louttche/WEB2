import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TASKS } from '../mock-tasks';
import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks = TASKS;
  TaskInfoForm;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.TaskInfoForm = this.formBuilder.group({
      name: '',
      description: ''
    });
  }

  ngOnInit(): void {
  }

  selectedTask: Task;

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  sortTasksID(): void{
    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].id = i + 1;      
    }
  }

  onCreate(taskDetails) {
    this.tasks.push({name: taskDetails.name, description: taskDetails.description, id: this.tasks.length + 1});
    this.TaskInfoForm.reset();
    this.sortTasksID();
  }

  onDelete(task: Task) {
    if (this.tasks.includes(task)){
      this.tasks.splice(task.id - 1, 1);
    }
    console.log('Deleted task')
    this.sortTasksID();
  }

  onUpdate(task: Task, taskDetails){
      var index = this.tasks.findIndex(task => task === this.selectedTask);
      this.tasks[index].name = taskDetails.name;
      this.tasks[index].description = taskDetails.description;
      this.TaskInfoForm.reset();
      this.sortTasksID();
  }
}