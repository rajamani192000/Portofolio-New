import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  NgForm
} from '@angular/forms';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {
  title = 'cake';
  cakeform: any;
  submitted = false;
  selectedcake: string ='';
  candles=25;
  Inscription=20;
  totalvalue:any;
  fillingvalue:any;
  cakevalue :any;
  candelsvalue:any;
  inscription:any;
  totalcakevalue:any;
  fillings:any;

  cakes =  [
    {id:'1', value:'Round Cake 6" - serves 8 people ($20)', amount:20},
    {id:'2', value:'Round Cake 8" - serves 12 people ($25)', amount:25},
    {id:'3', value:'Round Cake 10" - serves 16 people ($35)', amount:35},
    {id:'4', value:'Round Cake 12" - serves 30 people ($75)', amount:75},
  ]
  isDisabled = true;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.cakeform = this.formBuilder.group({
      cake: ['', Validators.required],
      filling: ['', Validators.required],
      candles: ['', ],
      inscription: ['', Validators.required],

    });

  }

totalcakesvalue(){
  let cakevalue=parseInt(this.cakevalue);
  let candlesvalue=this.candelsvalue === true ? 25 : 0;
  let inscriptionvalue=this.inscription === true ? 20 : 0;
  this.totalcakevalue = cakevalue+candlesvalue+inscriptionvalue;
}

triggerevent(){
  this.totalcakesvalue()

}

  triggerSomeEvent() {
    this.totalcakesvalue()
    this.isDisabled = !this.isDisabled;
    return;
}

  radioChangeHandler (event:any){
    this.totalcakesvalue()
    this.selectedcake= event.target.value;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.cakeform.controls;
  }


  submitdata(){
    let formvalue=this.cakeform.value;
    let cakevalue=parseInt(formvalue.cake);
    let candlesvalue=formvalue.candles === true ? 25 : 0;
    let inscriptionvalue=formvalue.inscription === true ? 20 : 0;
    this.totalvalue = cakevalue+candlesvalue+inscriptionvalue;
    this.fillingvalue=formvalue.filling;
  }
}
