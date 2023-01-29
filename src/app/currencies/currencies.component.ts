import { apiclass } from './apiclass';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  currencie:any;
  letapi: any[] = [];
  filteredcurrencie:any;

  constructor(private api:AuthService, private FormBuilder:FormBuilder) {
    this.currencie=this.FormBuilder.group({
      currencies:['',Validators.required]
    })
   }

  ngOnInit(): void {
    this.api.getProduct().subscribe((data) => {
      this.letapi=data.data
    });

  }



  addproject(): void {
    let currencievalue=this.currencie.value
    this.filteredcurrencie = [...this.letapi.filter((letapi) => letapi.id.includes(currencievalue.currencies))];
    this.onResetcurrencie();
  }

  onResetcurrencie(): void {
    this.currencie.reset();
  }

  onClearcurrencie(row:any){
    for(let i=0 ;i<= this.filteredcurrencie.length ;i++){
  		if(row== this.filteredcurrencie[i]){
  			this.filteredcurrencie.splice(i,1)
  		}
  	}
  }

}
