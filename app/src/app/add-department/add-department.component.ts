import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { TaskService } from '../task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  newDepartment: Department;
  departmentFormGroup: FormGroup;

  constructor(private taskService: TaskService, private location2: Location) { }

  ngOnInit() {
    this.departmentFormGroup = new FormGroup(
      {
        name : new FormControl('', [Validators.required]),
        location : new FormControl('', [Validators.required]),
        numberOfEmployees : new FormControl('', [Validators.required])
      },
    );
  }
  addDepartment() {
    this.taskService.addDepartment(this.departmentFormGroup.value).subscribe(data => {
      this.newDepartment = data;
      console.log(this.newDepartment);
    });
  }
  backClicked(){
    this.location2.back();
  }
  get name() { return this.departmentFormGroup.get('name'); }
  get location() { return this.departmentFormGroup.get('location'); }
  get numberOfEmployees() { return this.departmentFormGroup.get('numberOfEmployees'); }

}