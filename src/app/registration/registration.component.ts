import { Router } from '@angular/router';
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Validator } from '../utils/Validator';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: any;
  submitted = false;
  actionbtn: string = "Register";
  constructor(
    private formBuilder: FormBuilder,
    private api: AuthService,
    private _route: Router,
  ) {}

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group(
      {
        firstname: [
          "",
          [
            Validators.required,
            ,
            Validators.maxLength(15),
            Validators.pattern("^(?=.*)[a-zA-Z]+$"),
          ],
        ],
        lastname: [
          "",
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern("^[a-zA-Z]+$"),
          ],
        ],
        username: [
          "",
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern("^[a-zA-Z]+$"),
          ],
        ],
        email: ["", [Validators.required, Validators.email]],
        telnumber: [
          "",
          [
            Validators.required,
            Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
          ],
        ],
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required]],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [Validator.match("password", "confirmPassword")],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  addProduct() {
    this.submitted = true;
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.api.postProduct(this.registerForm.value)
      .subscribe({
        next: (res) => {
          alert("Student Added Successfully");
          this.onReset();
          this._route.navigate(["login"]);
        },
        error: () => {
          alert("Error While Adding student Details");
        },
      });
    }else{
      alert("Register Form Not Valid");

    }
  }


  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();

  }
}
