import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: 'home', component: AppComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'tasks/:id', component: TaskDetailsComponent},
  {path: '', component: AppComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(
      appRoutes, { enableTracing: true }
    ),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
