import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectmanagementComponent } from './projectmanagement/projectmanagement.component';
import { CakesComponent } from './cakes/cakes.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrenciesComponent } from './currencies/currencies.component';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageComponent } from './image/image.component';
import { RandomuserComponent } from './randomuser/randomuser.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import { AgmCoreModule } from '@agm/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CalculatorComponent } from './calculator/calculator.component';
import { AntonyComponent } from './services/a/antony/antony.component';
import { EmployeeComponent } from './employee/employee.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [			
    AppComponent,
    ProjectmanagementComponent,
    CakesComponent,
    CurrenciesComponent,
    HomepageComponent,
    ImageComponent,
    RandomuserComponent,
    CalculatorComponent,
    AntonyComponent,
      EmployeeComponent,
      RegistrationComponent,
      LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatTimepickerModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    MatFormFieldModule,
    OwlDateTimeModule,
     OwlNativeDateTimeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDwFV5OV-cBJooKYPGR4oABMg6EeLuJ0YA'
    })
  ],
  providers:  [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: { }}],
  bootstrap: [AppComponent, ProjectmanagementComponent,CakesComponent]
})
export class AppModule { }
