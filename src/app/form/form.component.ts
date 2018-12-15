import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

import { UUID } from 'uuid-base64';


import { Record } from '../record';
import { RecordService } from '../record.service';
import { AppComponent } from '../app.component';
import { FormService } from '../form.service';

import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [FormService]
})
export class FormComponent implements OnInit {

  constructor( private rs:RecordService, private appcomp:AppComponent, private fs:FormService, private _http:Http, private router:Router, private route:ActivatedRoute ) {}
  
  question1;
  question2;
  question3;
  question4;
  record:Record;
  guid: string = "";
  isEdit:boolean = false;
  dropdownCount: number = 4+1;

  ngOnInit() {
    this.bindData();
    this.preselect();
    this.route.params.subscribe( params => {
      this.guid = params['guid'];
      if( this.guid != "" ) this.isEdit = true;
      this.loadForm(--this.dropdownCount);
      });
  }
  loadForm( count:number ){
    console.log("COUNTDOWN: "+ count);
    if( count == 0 && this.isEdit ){
      
    }
    
  }
  bindData(){
    
    this.fs.getMenu('Question 1').then( res => {
      this.question1 = res;
      this.loadForm(--this.dropdownCount);
    });
    this.fs.getMenu( 'Question 2' ).then( res => {
      this.question2 = res;
      this.loadForm(--this.dropdownCount);
    });
    this.fs.getMenu( 'Question 3' ).then( res => {
      this.question3 = res;
      this.loadForm(--this.dropdownCount);
    });
    this.fs.getMenu( 'Question 4' ).then( res =>{
      this.question4 = res;
      this.loadForm(--this.dropdownCount);
    });
  }
  preselect(){
  }
  onSubmit(){
  }
  onSubby( theform: NgForm ){
    // ==== OUTLINE ====
    // validate();
    // calculatePoints();
    // generateGuid();
    // postRecord();
    // resultsPage();
    // -----------------

    // ================================
    // ====== TEMPORARY POPULATE ======
    // ================================
    theform.value.Name = "Johnson";
    theform.value.Birthdate = "1990-09-09";
    theform.value.SSN = 1111;
    theform.value.Zipcode = 26101;
    theform.value.dli = "1990-09-01";
    theform.value.question1 = true;
    theform.value.question2 = true;
    theform.value.question3 = true;
    theform.value.question4 = true;
    theform.value.question5 = true;
    theform.value.question6 = false;
    theform.value.question7 = false;
    // --------------------------------
    
    this.record = theform.value;
    
    this.record.guid = UUID.generate();
    this.record.Points = 0;
    this.record.Section1 = 20;
    this.record.Section2 = 14;
    this.record.Section3 = 10;
    this.record.Section4 = 19;

    var pointsQueryCountdown = 4;

    this.fs.getPoints( 'question1', theform.value.question1 ).then( res => {
      this.addPoints(res);
      this.afterPointsQuery( --pointsQueryCountdown);
     });
    this.fs.getPoints( 'question1', theform.value.question1 ).then( res =>{
      this.addPoints(res);
      this.afterPointsQuery( --pointsQueryCountdown);
    });
    this.fs.getPoints( 'question1', theform.value.question1 ).then( res => {
      this.addPoints(res);
      this.afterPointsQuery( --pointsQueryCountdown );
    });
    this.fs.getPoints( 'question1', theform.value.question1 ).then( res => {
      this.addPoints(res);
      this.afterPointsQuery( --pointsQueryCountdown );
    });
  }
  afterPointsQuery( count:number ){
    if( count == 0 ){
      this.rs.postRecord( this.record ).then( res => { 
        this.appcomp.ok = res;
        this.nextPage( this.record.guid );
      });
    }
  }
  nextPage( guid:string){
    this.router.navigateByUrl( 'form/result/'+guid );
  }
  addPoints( res ){
    this.record.Points += Number(res);
  }
}
