import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-randomuser',
  templateUrl: './randomuser.component.html',
  styleUrls: ['./randomuser.component.css']
})
export class RandomuserComponent implements OnInit {
  randomuserform:any;
  submitted1= false;
  selectedgender: string = '';
  readioSelected: any;
  userdata:any;
  name:any;
  location:any;
  street:any;
  coordinates:any;
  dob:any;
  registered:any;
  picture:any;
  randomdata:any
  gender:any;



  @ViewChild('picker') picker: any;

  public date!: moment.Moment;
  public disabled = false;
  public hideTime = true;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  endpointlat:any;
  endpointlng:any;
  startpointlat = 21.7679;
  startpointlang = 78.8718;
  direction:any;

  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());

  public stepHours = [1, 2, 3, 4, 5];
  public stepMinutes = [1, 5, 10, 15, 20, 25];
  public stepSeconds = [1, 5, 10, 15, 20, 25];


  public options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];



  gender1 = [
    { id: '1', value: 'Male' },
    { id: '2', value: 'Female' },
  ];

  constructor(private FormBuilder:FormBuilder,private api:AuthService) { }

  ngOnInit(): void {

    this.randomuserform= this.FormBuilder.group({
      title: ['', [Validators.required]],
      first: ['', [Validators.required]],
      last: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      email: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      age: ['', [Validators.required]],
      registereddate: ['', [Validators.required]],
      registeredage: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cell: ['', [Validators.required]],
      direction:['', [Validators.required]],
    })

  }

  changeRandom(){
    this.api.getrandomuser().subscribe((data) => {
      this.userdata=data.results;
      this.randomdata=this.userdata[0];
      this.gender=this.randomdata.gender
      this.name=this.userdata[0].name;
      this.location=this.userdata[0].location;
      this.street=this.location.street;
      this.coordinates=this.location.coordinates;
      this.dob=this.userdata[0].dob;
      this.registered=this.userdata[0].registered;
      this.picture=this.userdata[0].picture;
      this.picture=this.picture.large
      this.mapcoordinates()
      this.patchvalue()
    });
  }

  mapcoordinates(){
    this.endpointlat=parseFloat(this.coordinates.latitude)
    this.endpointlng=parseFloat(this.coordinates.longitude)
    console.log("lat:",this.endpointlat);
    console.log("lng:",this.endpointlng);


    this.findcompass()
  }


  onChange(Event:any) {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.randomuserform.controls;
  }

  radioChangeHandler(event: any) {
    this.selectedgender = this.readioSelected;
  }


patchvalue(){

  this.randomuserform.controls['title'].setValue(this.name.title);
  this.randomuserform.controls['first'].setValue(this.name.first);
  this.randomuserform.controls['last'].setValue(this.name.last);
  this.randomuserform.controls['gender'].setValue(this.randomdata.gender);
  this.randomuserform.controls['street'].setValue(this.street.number+","+this.street.name+",");
  this.randomuserform.controls['city'].setValue(this.location.city);
  this.randomuserform.controls['state'].setValue(this.location.state);
  this.randomuserform.controls['country'].setValue(this.location.country);
  this.randomuserform.controls['postcode'].setValue(this.location.postcode);
  this.randomuserform.controls['email'].setValue(this.randomdata.email);
  this.randomuserform.controls['dob'].setValue(this.dob.date);
  this.randomuserform.controls['age'].setValue(this.dob.age);
  this.randomuserform.controls['registereddate'].setValue(this.registered.date);
  this.randomuserform.controls['registeredage'].setValue(this.registered.age);
  this.randomuserform.controls['phone'].setValue(this.randomdata.phone);
  this.randomuserform.controls['cell'].setValue(this.randomdata.cell);
  this.randomuserform.controls['direction'].setValue(this.direction);
  this.findcompass()

}




findcompass(){
   let x1 =  this.startpointlat;
   let y1 =  this.startpointlang;
  let x2= this.endpointlat;
  let y2= this.endpointlng;

    var radians = getAtan2((y1 - y2), (x1 - x2));

    function getAtan2(y: any, x: any) {
      return Math.atan2(y, x); //Returns the angle (in radians) from the X axis to a point.
  };

    var compassReading = radians * (180 / Math.PI); // represents the ratio of the circumference of a circle to its diameter

    var coordNames = ["NORTH", "NORTH EAST", "EAST", "SOUTH EAST", "SOUTH", "SOUTH WEST", "WEST", "NORTH WEST", "NORTH"];
    var coordIndex = Math.round(compassReading / 45);
    if (coordIndex < 0) {
        coordIndex = coordIndex + 8
    };

    this.direction= coordNames[coordIndex];
}

}
