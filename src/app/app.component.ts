import { CommonModule } from '@angular/common';
import { CommonService } from './services/common.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'crud-app';
  employeeData:any=[]=[];
  newEmployees={
    id:'',
    name:'',
    designation:'',
    department:'',
    salary:''
  }
  isEditMode=false;


  constructor(private CommonService:CommonService){}

  getEmployeeData(){
    this.CommonService.getData().subscribe((data)=>{
      this.employeeData=data;
      console.log(this.employeeData)
    })
  }

addUpdateEmployeeData() {
  if (this.isEditMode) {
    this.CommonService.editData(this.newEmployees.id, this.newEmployees).subscribe(
      () => {
        alert("Employee updated successfully");
        this.resetForm();
        this.getEmployeeData();
      },
      (err) => {
        console.error("Error updating employee", err);
        alert("Failed to update employee");
      }
    );
  } else {
    this.CommonService.addData(this.newEmployees).subscribe(
      () => {
        alert("Employee added successfully");
        this.resetForm();
        this.getEmployeeData();
      },
      (err) => {
        console.error("Error adding employee", err);
        alert("Failed to add employee");
      }
    );
  }
}
updateEmployeeData(employee: any) {
  this.isEditMode = true;
  this.newEmployees = { ...employee }; // Copy employee data to the form
}

  deleteEmployee(id: string) {
    this.CommonService.deleteData(id).subscribe(
      () => {
        this.employeeData = this.employeeData.filter((data: any) => data.id !== id);
        alert("Record deleted");
        this.getEmployeeData();
      },
      (err) => {
        console.error("Error deleting employee", err);
        alert("Failed to delete record");
      }
    );
  }

  resetForm(){
    this.isEditMode=false;
    this.newEmployees={
      id:'',
      name:'',
      designation:'',
      department:'',
      salary:'',
    }
  }


  ngOnInit(): void {
    this.getEmployeeData();
  }
}

