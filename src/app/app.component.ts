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
  constructor(private CommonService:CommonService){}

  getEmployeeData(){
    this.CommonService.getData().subscribe((data)=>{
      this.employeeData=data;
      console.log(this.employeeData)
    })
  }
  deleteEmployee(id:string){
    this.CommonService.deleteData(id).subscribe(()=>{
      this.employeeData=this.employeeData.filter((data:any)=>data.id==!id)
      alert("record delete")
      this.getEmployeeData()
    })
  }
  ngOnInit(): void {
    this.getEmployeeData();
  }
}
