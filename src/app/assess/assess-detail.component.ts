// TODO: Auto-suggestion: Make suggestions to get passing score.


import { Component, ElementRef, OnInit, AfterContentInit } from '@angular/core';
import * as D3 from 'd3/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Record } from '../record';
import { RecordService } from '../record.service';
import { AssessService } from './assess.service';
import { InfoService } from '../info.service';
import { Assess2 } from './assess';

@Component({
  selector: 'app-assess-detail',
  templateUrl: './assess-detail.component.html',
  styleUrls: ['./assess-detail.component.css'],
  providers: [AssessService, InfoService]
})
export class AssessDetailComponent implements OnInit {
	errorMsg: string;
	host;
	svg;
	te;
	record;
  
  constructor( private _element:ElementRef, private assessService:AssessService, private route:ActivatedRoute, private router:Router, private infoService:InfoService, private _location:Location ) {
  	//this.host = D3.select( this._element.nativeElement );
    this.host = D3.select( this._element.nativeElement );

  }
  getGuid():string {
    var value:string;
    this.route.params.subscribe( params => {
      value = String(params['guid']);
    });
    return value;
  }

  ngOnInit() {
  	//this.assessService.getRecord().then( res => this.te = res);
  	this.assessService.getRecord( this.getGuid() ).then( res => {
      this.record = res[0];
      this.record.Percentage = Math.round((this.record.Points / this.infoService.info.MaxPoints)*100)+"%";
      this.te = this.assessService.formatRecordForBarGraph( res ) as Assess2[];
      this.buildSVG();
    });
  }
  buildSVG(): void {
  	let width = 740;
  	let height = 400;
    let margin = {top: 40, right: 20, bottom: 0, left: 20};

  	this.host.html();
  	this.svg = this.host.select('#D3SVG').append('svg')
  		.attr('width', width )
  		.attr('height', height )
  		.style('background-color', 'transparent')
      .attr('class', 'rounded');
  	var scale = D3.scaleLinear()
		  .domain([0, 20])
  		.range( [0, height-margin.top-margin.bottom]);
  	
  	this.svg.selectAll('rect')
  		.data( this.te ).enter()
  		.append('rect')
        .attr( 'class', 'bar' )
        // .text( d => d.Points )
  			.attr( 'width', d => width/this.te.length-20 )
  			.attr( 'height', d => scale(d.Points) )
  			.attr( 'x', (d, i) => i * (width / this.te.length)+margin.left)
  			.attr( 'y', d => height - scale( d.Points ) -margin.bottom );
    this.svg.selectAll('text')
      .data(this.te).enter()
      .append('text')
      .attr( 'class', 'points' )
      .text( d => d.Points )
      .attr( 'x', (d, i) => i*(width / this.te.length) + (width/this.te.length-4)/2)
      .attr( 'y', d => height - scale(d.Points)+margin.top-margin.bottom-10 );
    var g = this.svg.append('g');

    g.selectAll('text')
      .data(this.te).enter()
      .append('text')
      .attr( 'class', 'label')
      .text( d => "Section "+d.Section )
      .attr( 'x', (d, i) => i*(width / this.te.length) + (width/this.te.length-60)/2)
      .attr( 'y', d => height - scale(d.Points)-margin.bottom-4 );
    
    var g = this.svg.append("g")
               .attr("transform", "translate(" + (margin.left+4) + "," + margin.top + ")");
    var x = D3.scaleBand()
              .domain( this.te.map( d => "Section "+d.Section ))
              .rangeRound([0, width]);
    var y = D3.scaleLinear()
              .domain([0,20])
              .rangeRound([height-margin.top-margin.bottom, 0]);
    g.append("g")
          .attr("class", "axis axis--x")
          .attr("transform", "translate("+ (0-10)+"," + (height-margin.top-margin.bottom) + ")");
          // .call(D3.axisBottom(x));
    g.append("g")
          .attr("class", "axis axis--y")
          .call(D3.axisLeft(y).ticks(4))
          .append("text")
          .attr("class", "axis-title")
          .attr("transform", "rotate(90) translate")
          .attr("y", 0)
          .attr("dy", "1.25em")
          .attr("text-anchor", "end")
          .text("Points");
  }
  click_View( guid:string ){
    this.router.navigateByUrl( 'form/view/' + guid );
  }
  click_Edit( guid:string ){
    this.router.navigateByUrl( 'form/' + guid );
  }
  click_Back(){
    this._location.back();
  }

}
