import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { FormGroup, FormControl } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departmentFormGroup: FormGroup;
  departments : Department[];
  selectedDepartment: Department;
  departmentByID: Department;
  newDepartment: Department;
  deleteFormGroup: FormGroup;
  searchText;
  faSearch = faSearch;


  constructor(private departmentService: DepartmentService) {  }

  ngOnInit() {
    this.deleteFormGroup = new FormGroup({});
    this.getDepartments();
  }

  onSelect(department: Department): void {
    this.selectedDepartment = department;
  }

  SortListByName(): void {
    this.departments.sort((a, b) => (a.name > b.name) ? 1 : -1);
  }
  SortListByID(): void {
    this.departments.sort((a, b) => (a.id > b.id) ? 1 : -1);
  }

  getDepartments(): void {
    this.departmentService.getDepartmentsDB()
        .subscribe(departments => this.departments = departments);
  }
  deleteDepartment() {

    this.departmentService.deleteDepartment(this.selectedDepartment.id).subscribe(data => {
      this.getDepartments();
    });
    this.selectedDepartment = null;
  }

  getDepartmentByID(id: number): void {
    this.departmentService.getDepartmentByID(this.selectedDepartment.id)
      .subscribe(data => this.departmentByID = data);
  }

}