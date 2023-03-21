import { RajamaniComponent } from './rajamani/rajamani.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { EmployeeComponent } from './employee/employee.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { RandomuserComponent } from './randomuser/randomuser.component';
import { ImageComponent } from './image/image.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { CakesComponent } from './cakes/cakes.component';
import { ProjectmanagementComponent } from './projectmanagement/projectmanagement.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'',component:RajamaniComponent},
  {path:'cake',component:CakesComponent},
  {path:'project',component:ProjectmanagementComponent},
  {path:'currencies',component:CurrenciesComponent},
  {path:'image',component:ImageComponent},
  {path:'randomuser',component:RandomuserComponent},
  {path:'calculator',component:CalculatorComponent},
  {path:'crud',component:EmployeeComponent},
  {path:'login',component:LoginComponent},
  {path:'singup',component:RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
