import { Component, OnInit, Input } from '@angular/core';
import { Department } from '../department';
import { TaskService } from '../task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  departmentFormGroup: FormGroup;
  department: Department = new Department();
  departments: Department[] = [];
  updatedDepartment: Department = new Department();

  constructor(private taskService: TaskService, 
              private route: ActivatedRoute,
              private locationMap: Location) { }

  ngOnInit() {
    this.getDepartmentByID();
    this.departmentFormGroup = new FormGroup(
      {
        name : new FormControl('', [Validators.required]),
        location : new FormControl('', [Validators.required]),
        numberOfEmployees : new FormControl('', [Validators.required])
      },
    );
    this.departmentFormGroup.setValue({
      name: [this.department.name],
      location: [this.department.location],
      numberOfEmployees: [this.department.numberOfEmployees]
    });
  }
  
  getDepartments(){
    this.taskService.getDepartmentsDB().subscribe(data => {
      this.departments = data;
    });
  }
  getDepartmentByID() {
    const id = +this.route.snapshot.paramMap.get('id');
  this.taskService.getDepartmentByID(id)
    .subscribe(department => this.department = department);
  }

  updateDepartment() {
    this.updatedDepartment.id = this.department.id;
    
    if(this.departmentFormGroup.value.name != "")
      this.updatedDepartment.name = this.departmentFormGroup.value.name;
    else
      this.updatedDepartment.name = this.department.name;  

    if(this.departmentFormGroup.value.location != "")
      this.updatedDepartment.location = this.departmentFormGroup.value.location;
    else
      this.updatedDepartment.location = this.department.location;
    
    if(this.departmentFormGroup.value.numberOfEmployees != "")
      this.updatedDepartment.numberOfEmployees = this.departmentFormGroup.value.numberOfEmployees;
    else
      this.updatedDepartment.numberOfEmployees = this.department.numberOfEmployees;

    this.taskService.updateDepartment(this.updatedDepartment).subscribe((ret)=>{
      console.log(this.updatedDepartment);
    });
  }
  backClicked() {
    this.locationMap.back();
  }

  get name() { return this.departmentFormGroup.get('name'); }
  get location() { return this.departmentFormGroup.get('location'); }
  get numberOfEmployees() { return this.departmentFormGroup.get('numberOfEmployees'); }
}