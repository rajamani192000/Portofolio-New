import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  thumbnail:any;

  constructor(private api:AuthService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
  }

  addimage(){
    this.api.getimage().subscribe((data) => {
      let imagedata=data;
      this.thumbnail =  imagedata.url;
    });
  }

}
