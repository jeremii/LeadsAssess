import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Record } from '../record';
import { Assess1, Assess2 } from './assess';

@Injectable()
export class AssessService {
	//private url = 'http://localhost:4200';
	private socket;
	private id;
  private rec;

  constructor( private _http: Http ) {}

  getRecord( guid:string ):Promise<Assess1> {
  	return this._http.get( 'http://noraswann.com/leadscalc/api.php/Records?filter=guid,eq,'+guid+'&columns=guid,Name,SSN,Birthdate,Points,Edits,Section1,Section2,Section3,Section4' )
  		.toPromise()
  		.then( res => {
        //this.logIt(res);
        return res.json() as Assess1;
      })
  		.catch( this.handleError );
  }
  formatRecordForBarGraph( rec:Assess1 ):Assess2[] {
    
    var result:string = "[";
    result+= '{ "Section":1, "Points":'+rec[0].Section1+'},';
    result+= '{ "Section":2, "Points":'+rec[0].Section2+'},';
    result+= '{ "Section":3, "Points":'+rec[0].Section3+'},';
    result+= '{ "Section":4, "Points":'+rec[0].Section4+'}';
    result += "]";
    return JSON.parse(result);  
  }
  private logIt( res: Response )
  {
    console.log('res:', res, 'data:', res.json());
  }
  private returnIt( res: Response )
  {
    return res.json();
  }
  private extractData( res: Response )
  {
    let body = res.json();
    return body.data || { };
  }
  private handleError ( error: Response | any )
  {
    let errMsg: string;
    if( error instanceof Response)
    {
      const body = error.json() || '';
      const err = body.error || JSON.stringify( body );
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
