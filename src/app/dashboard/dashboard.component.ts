import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {ApiService} from '../shared/api.service';
import { EmployeeModel } from './employee.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup
  empModel : EmployeeModel = new EmployeeModel();
  empData !: any;
  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      id:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
    this.getDetails();
  }

  postDetails(){
    this.empModel.name = this.formValue.value.name;
    this.empModel.id = this.formValue.value.id;
    this.empModel.email = this.formValue.value.email;
    this.empModel.mobile = this.formValue.value.mobile;
    this.empModel.salary = this.formValue.value.salary;

    this.api.postEmployee(this.empModel)
    .subscribe(res =>{
      console.log(res);
      alert("Employee Added Successfully!");
      let cancel = document.getElementById("cancel");
      cancel?.click();
      this.formValue.reset();
      this.getDetails();
    },
    err=>{
      alert("Something went Wrong!");
    })
  }
  getDetails(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.empData = res;
    })
  }

  deleteDetails(emp:any){
    let id = emp.id;
    this.api.deleteEmployee(id)
    .subscribe(()=>{
      alert("Employee Details got Deleted!");
      this.getDetails();
    },
    err=>{
      alert("Somethings Fishy!");
    })
  }

 onEdit(emp:any){
   this.empModel.id = emp.id;
   this.formValue.controls['name'].setValue(emp.name);
   this.formValue.controls['email'].setValue(emp.email);
   this.formValue.controls['id'].setValue(emp.id);
   this.formValue.controls['salary'].setValue(emp.salary);
   this.formValue.controls['mobile'].setValue(emp.mobile);
 }

 updateDetails(){
  this.empModel.name = this.formValue.value.name;
  this.empModel.email = this.formValue.value.email;
  this.empModel.mobile = this.formValue.value.mobile;
  this.empModel.salary = this.formValue.value.salary;
  this.api.putEmployee(this.empModel,this.empModel.id).subscribe(()=>{
    alert('Details got updated successfully!');
    let cancel = document.getElementById("cancel");
      cancel?.click();
      this.formValue.reset();
      this.getDetails();
  })
 }
}
