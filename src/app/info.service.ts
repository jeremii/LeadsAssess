import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Info } from './info';

@Injectable()
export class InfoService {

  info;

  constructor( private _http:Http ) {
  	this.info = new Info();
  	this.getInfo( 'Max%20Edits' ).then( res => this.info.MaxEdits = Number(res));
  	this.getInfo( 'Max%20Points' ).then( res => this.info.MaxPoints = Number(res));
  	this.getInfo( 'Section%201%20Max%20Points' ).then( res => this.info.Section1Max = Number(res));
  	this.getInfo( 'Section%202%20Max%20Points' ).then( res => this.info.Section2Max = Number(res));
  	this.getInfo( 'Section%203%20Max%20Points' ).then( res => this.info.Section3Max = Number(res));
  	this.getInfo( 'Section%204%20Max%20Points' ).then( res => this.info.Section4Max = Number(res));
  }

  getInfo( name:string ):Promise<number> {
  	return this._http.get( 'http://noraswann.com/leadscalc/api.php/Info?filter=Name,eq,' + name + '&columns=Number' )
  		.toPromise()
  		.then( res => {
        //this.logIt(res);
        return res.json()[0]["Number"];
      })
  	    .catch( this.handleError );
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
