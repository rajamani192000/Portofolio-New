import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,Validators} from '@angular/forms';
import { Validator } from '../utils/Validator';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employeeform:any;
  submitted = false;
  getemployeedata:any;
  employeeformIndex:any;

  edit!:boolean;

  constructor(private FormBuilder:FormBuilder,private api:AuthService) { }

  ngOnInit(): void {
    this.getAllProduct()
    this.employeeform = this.FormBuilder.group(
      {
        firstname: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z_ ]+$"),
          ],
        ],
        lastname: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z_ ]+$"),
          ],
        ],
        username: [
          "",
          [
            Validators.required,
            Validators.pattern("^[a-zA-Z_ ]+$"),
          ],
        ],
        email: ["", [Validators.required, Validators.email]],
        telnumber: [
          "",
          [
            Validators.required,
            Validators.pattern("^[0-9]{10}$"),
          ],
        ],
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]],
      },
      {
        validators: [Validator.match("password", "confirmPassword")],
      }
    );
  }

  get h(): { [key: string]: AbstractControl } {
    return this.employeeform.controls;
  }

  addEmployee() {
    this.submitted = true;
    if(!this.edit){
      if(this.employeeform.invalid){
        return;
      }
      if(this.employeeform.valid){
      console.log(this.employeeform.value);
      this.api.postProduct(this.employeeform.value)
      .subscribe({
        next: (res) => {
          alert("Employee Added Successfully");
          this.getAllProduct()    //show the data after submiting form
          let ref=document.getElementById("cancel")
          ref?.click();
          this.onResetemployee();   //after submit, the form will reset
        },
        error: () => {
          alert("Error While Adding Employee Details");
        },
      });
      }
  }
    else{
      this.updateProduct()
    }
  }
//get the data from api
  getAllProduct(): void {
    this.api.getProductt().subscribe((res) => {
      console.log(res);
      this.getemployeedata = res;
    });
  }

  editDepartment(employye:any){
    this.edit=true;
    this.employeeform.controls['firstname'].setValue(employye.firstname);
    this.employeeform.controls['lastname'].setValue(employye.lastname);
    this.employeeform.controls['username'].setValue(employye.username);
    this.employeeform.controls['email'].setValue(employye.email);
    this.employeeform.controls['telnumber'].setValue(employye.telnumber);
    this.employeeform.controls['password'].setValue(employye.password);
    this.employeeform.controls['confirmPassword'].setValue(employye.confirmPassword);
    this.employeeformIndex=employye.id;
  }

  updateProduct() {
    this.api.putProduct(this.employeeform.value, this.employeeformIndex).
    subscribe({
      next: (res) => {
        alert("Employee details Update Successfully");
        this.getAllProduct()
        let ref=document.getElementById("cancel")
          ref?.click();
        this.onResetemployee();
      },
      error: () => {
        alert("Error While updating the Employee Details");
      },
    });
  }

  onResetemployee(): void {
    this.submitted = false;
    this.employeeform.reset();
  }

  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        alert("Student Employee Successfully");
        this.getAllProduct();
      },
      error: () => {
        alert("Error While Deleting Employee Details");
      },
    });
  }
//change the button update or submit
  event(){
    this.edit = false;
  }

}
