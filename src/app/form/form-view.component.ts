import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';




import { Record } from '../record';
import { RecordService } from '../record.service';
import { FormService } from '../form.service';


@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css'],
  providers: [FormService]
})
export class FormViewComponent implements OnInit {

  constructor( private rs:RecordService, private fs:FormService, private route:ActivatedRoute, private _location:Location ) { }

  theform:Record;
  guid:string = "";

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.guid = params['guid'];
  		this.rs.getRecord(this.guid).then( res => {
	  		
	  		res.anon1 = this.assignYesOrNo( res.anon1 );
	  		res.anon2 = this.assignYesOrNo( res.anon2 );
	  		res.anon9 = this.assignYesOrNo( res.anon9 );
	  		res.anon10 = this.assignYesOrNo( res.anon10 );
	  		res.anon11 = this.assignYesOrNo( res.anon11 );
	  		res.anon6 = this.assignYesOrNo( res.anon6 );
	  		res.anon7 = this.assignYesOrNo( res.anon7 );


	  		this.theform = res;
	  		this.loadData();

	  	});
  	});
  }
  assignYesOrNo( val:string ):string {
  	if ( val == "1" )
  		return "YES";
  	return "NO";
  }
  loadData(){
  	this.fs.getName( 'Question 1', this.theform.anon5 ).then( res => this.theform.anon5 = res );
  	this.fs.getName( 'Question 2', this.theform.anon8 ).then( res => this.theform.anon8 = res );
  	this.fs.getName( 'Question 3', this.theform.anon3 ).then( res => this.theform.anon3 = res );
  	this.fs.getName( 'Question 4', this.theform.anon4 ).then( res => this.theform.anon4 = res );
  	
  }
  click_Back(){
    this._location.back();
  }

}
