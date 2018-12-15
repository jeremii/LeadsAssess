import { Component, OnInit } from '@angular/core';

import { Record } from './record';
import { RecordService } from './record.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = "Check!";

  constructor( private rs:RecordService ){}
  
  public records: Record[];
  public ok = "_";

  ngOnInit(): void {
    //let rec:Record = { ID:8, Name:"Lisa", SSN:6666, Birthdate:"1960-10-10", Points:100 }
    //this.rs.postRecord(rec).then( res => this.ok = res );
  	//this.rs.getRecords().then( records => this.records = records );
  }
}
