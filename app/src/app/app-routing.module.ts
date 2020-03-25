import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { EmployeesComponent } from './employees/employees.component';
import { DepartmentsComponent } from './departments/departments.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'employees', component: EmployeesComponent}, 
  {path: 'tasks/:id', component: TaskDetailsComponent},
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
