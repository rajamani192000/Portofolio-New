import { AuthService } from "./../services/auth.service";
import { Component, Input, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() subjectchild:any;
  login: any;
  submitted = false;
  constructor(
    private _route: Router,
    private api: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.login.controls;
  }

  logindata(login: FormGroup) {
    this.submitted = true;
    console.log(this.login.value);
    this.api.getProductt().subscribe((res) => {
      const user = res.find((a: any) => {
        return (
          a.email === this.login.value.email &&
          a.password === this.login.value.password
        );
      });

      if (user) {
        alert("you are successfully login");
        this.login.reset();
        this._route.navigate(["crud"]);
      } else {
        alert("User Not Found");
        this._route.navigate(["login"]);
      }
    });
  }
}
