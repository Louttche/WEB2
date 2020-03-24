import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
//import { TASKS } from './mock-tasks';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  taskJson = 'assets/tasks.json';

  constructor(private http: HttpClient) { }

  getTasks(){
    return this.http.get<Task[]>(this.taskJson);
  }

  getTask(id: number | string){
    return this.getTasks().pipe(
      map((tasks: Task[]) => tasks.find(task => task.id === +id)
      )
    );
  }
}