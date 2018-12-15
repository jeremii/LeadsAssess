import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

import { RecordService } from '../record.service';
import { InfoService } from '../info.service';

import { Record } from '../record';

@Component({
  selector: 'app-review',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css'],
  providers: [InfoService]
})
export class AssessComponent implements OnInit {

  constructor( private rs:RecordService, private infoService:InfoService, private router:Router ) { }

  percentage:number;

  ngOnInit() {
    
  }
  private records:Record[];
  onSubmit( theform:NgForm )
  {
  	//console.log( theform.value.LastName );
  	this.rs.search( theform.value ).then( res => this.records = res );
  }
  click_Assess( guid:string ){
    this.router.navigateByUrl( 'assess/' + guid );
  }
  click_View( guid:string ){
    this.router.navigateByUrl( 'form/view/' + guid );
  }
  click_Edit( guid:string ){
    this.router.navigateByUrl( 'form/' + guid );
  }
}
