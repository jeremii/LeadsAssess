import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FormService {

  constructor(private http: Http ){}

  getMenu( menu:string ):Promise<string[]> {
    return this.http.get( 'http://noraswann.com/leadscalc/api.php/menu_'+menu )
      .toPromise()
      .then( res => {
        //this.logIt( res );
        return this.returnIt( res ); })
      .catch( this.handleError );
      //.map(this.extractData).catch(this.handleError);
  }
  getName( menu:string, code:number ){
    return this.http.get( 'http://noraswann.com/leadscalc/api.php/menu_'+menu+'?filter=id,eq,'+code+'&columns=Name' )
      .toPromise()
      .then( res => {
        //this.logIt( res );
        return this.returnIt( res )[0]["Name"]; })
      .catch( this.handleError );
      //.map(this.extractData).catch(this.handleError);
  }
  getPoints( menu:string, name:string ):Promise<number>{
    return this.http.get('http://noraswann.com/leadscalc/api.php/menu_'+menu+'?filter=ID,eq,'+name+'&columns=Points')
      .toPromise()
      .then( res => {
        //this.logIt( res );
        return this.returnIt( res )[0]["Points"];
      })
      .catch( this.handleError );
  }
  getHeader():RequestOptions {
    let head = new Headers();
    head.append( "Content-Type", "application/json" );
    return new RequestOptions({ headers: head });
  }
  private logIt( res: Response )
  {
    console.log('res:', res, 'data:', res.json());
  }
  private returnIt( res: Response )
  {
    return res.json() || {};
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
