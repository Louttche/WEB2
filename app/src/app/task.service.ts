import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { TASKS } from './mock-tasks';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]>{
    return of(TASKS);
  }

  getTask(id: number | string){
    return this.getTasks().pipe(
      map((tasks: Task[]) => tasks.find(task => task.id === +id)
      )
    );
  }
}