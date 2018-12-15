import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecordService } from '../record.service';

@Component({
  selector: 'app-form-result',
  templateUrl: './form-result.component.html',
  styleUrls: ['./form-result.component.css']
})
export class FormResultComponent implements OnInit {

  constructor( private route:ActivatedRoute, private router:Router, private rs:RecordService ) { }

  guid:string;
  subtitle:string;
  points:number;
  image:number;
  backgroundColor: string;
  message1: string;
  message2: string;

  ngOnInit() {
  	console.log();
  	this.route.params.subscribe( params => {
  		this.guid = params['guid'];
  	});
  	this.route.queryParams.subscribe(params => {
  		this.subtitle = params['filter'];
  	});
    this.rs.getPoints( this.guid ).then( res => {
      this.points = Number(res);
      this.nextStep();
    });
  }
  nextStep(){
    if( this.points > 20 )
    {
      this.backgroundColor = "bg-success";
      this.message1 = "Eligible";
      this.message2 = "Gather more information.";
    } else if ( this.points < 20 ){
      this.backgroundColor = "bg-danger";
      this.message1 = "Ineligible.";
      this.message2 = "Please call us when something changes.";
    }
  }
  click_Edit(){
    this.router.navigateByUrl( 'form/' + this.guid );
  }
  click_NewForm(){
    this.router.navigateByUrl( 'form/' );
  }
  

}
