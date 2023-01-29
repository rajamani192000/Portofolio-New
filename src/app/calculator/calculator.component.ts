import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  output:any='';
  constructor() { }

  ngOnInit(): void {
  }


  clear(){
    this.output.value ='';
  }

  del(){
    this.output.value = this.output.value.slice(0,-1);

  }

  display(num:any){
    console.log(this.output);

    this.output += num;

  }

  calculate(){
    try{
      this.output.value = eval(this.output.value)
    }
    catch(err){
      alert("Invalid")
    }
  }

}
