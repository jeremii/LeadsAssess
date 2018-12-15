import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Record } from './record';

@Injectable()
export class RecordService {

  constructor(private http: Http ){}

  
  getRecords():Promise<Record[]> {
    return this.http.get( 'http://noraswann.com/leadscalc/api.php/Records' )
      .toPromise()
      .then( res => {
        //this.logIt( res );
        return this.returnIt( res ); })
      .catch( this.handleError );
      //.map(this.extractData).catch(this.handleError);
  }
  postRecord(info:Record):Promise<any>{
    return this.http.post('http://noraswann.com/leadscalc/api.php/Records', JSON.stringify(info), this.getHeader())
      .toPromise()
      .catch(this.handleError);
  }
  filterAppendAnd( formattedString:string, data:string, filter:string )
  {
    if( data != "" )
    {
      formattedString += data;
      filter += filter != "" ? "&"+formattedString : formattedString;
    }
    return filter;
  }
  search( values ):Promise<Record[]>
  {
    var filter:string = "";
    filter = this.filterAppendAnd( 'Name,cs,', values.Name, filter );
    filter = this.filterAppendAnd( 'SSN,eq,', values.SSN, filter );
    filter = this.filterAppendAnd( 'Birth,eq,', values.Birthdate, filter );
    filter = this.filterAppendAnd( 'Zipcode,eq,', values.Zipcode, filter );

    return this.http.get( 'http://noraswann.com/leadscalc/api.php/Records?filter='+filter )
      .toPromise()
      .then( res => {
        //console.log('res:', res, 'data:', res.json());
        return res.json() as Record[];
      })
      .catch( this.handleError );
  }
  getRecord( guid:string ):Promise<Record> {
    return this.http.get( 'http://noraswann.com/leadscalc/api.php/Records?filter=guid,eq,'+guid )
      .toPromise()
      .then( res => {
        //console.log('res:', res, 'data:', res.json());
        return res.json()[0] as Record; })
      .catch( this.handleError );
  }
  getPoints( guid:string ):Promise<number>{
    return this.http.get( 'http://noraswann.com/leadscalc/api.php/Records?filter=guid,eq,'+guid+'&columns=Points' )
      .toPromise()
      .then( res => {
        this.logIt(res);
        return res.json()[0]["Points"] as number;
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
    return res.json() as Record[];
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
