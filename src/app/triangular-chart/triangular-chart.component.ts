import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnChanges, Input } from '@angular/core';
import * as D3 from '../bundle-d3';
import { Department } from '../department';

@Component({
  selector: 'app-triangular-chart',
  templateUrl: './triangular-chart.component.html',
  styleUrls: ['./triangular-chart.component.css']
})
export class TriangularChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() dpts: Array<Department>;
  @ViewChild('container') element: ElementRef;

  private host;
  private svg;
  private margin;
  private width;
  private height;
  private side;
  private sideScale;
  private perpScale;
  private r;
  private axis;
  private axes;
  private data;
  private htmlElement: HTMLElement;

  constructor() { }

  ngOnInit() {
    console.log('OnInit');
  }

  ngAfterViewInit() {
    console.log('AfterViewInit');
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.setup();
    this.buildSVG();
    this.drawAxes();
  }

  /**
  * Repopulate the graph when @Input changes
  **/
  ngOnChanges(): void {
    if (!this.dpts || this.dpts.length === 0 || !this.host) return;
    this.populate();
  }

  /**
  * Setup the size and scale ranges.
  **/
  private setup(): void {
    this.margin = { top: 50, bottom: 200 };
    this.width = 960;
    this.height = 800 - this.margin.top - this.margin.bottom;
    this.side = this.height * 2 / Math.sqrt(3);
    this.sideScale = D3.scaleLinear().domain([0, 1]).range([0, this.side]);
    this.perpScale = D3.scaleLinear().domain([0, 1]).range([this.height, 0]);
    this.r = D3.scaleSqrt().range([0, 10]);
  }

  /**
  * Build the SVG element.
  **/
  private buildSVG(): void {
    this.svg = this.host.append('svg')
    .attr('width', this.width).attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + ((this.width - this.side) / 2) + ',' + (this.margin.top + 0.5) + ')')
    .append('g');
  }

  /**
  * Draw the axes.
  **/
  private drawAxes(): void {
    this.axis = D3.axisLeft(this.perpScale)
    .tickFormat((n:number) => (n * 100).toFixed(0))
    .tickSize(this.side * -0.3)
    .tickPadding(5);

    this.axes = this.svg.selectAll('.axis')
    .data(['i', 'ii', 'iii'])
    .enter().append('g')
    .attr('class', d => 'axis ' + d)
    .attr('transform',  (d:string) => d === 'iii' ? '' : 'rotate(' + (d === 'i' ? 240 : 120) + ',' + (this.side * 0.5) + ',' + (this.height / 3 * 2) + ')')
    .call(this.axis);

    this.axes.selectAll('line')
    .attr('class', 'dash')
    .attr('transform', 'translate(' + (this.side * 0.2) + ',0)')
    .attr('stroke-dasharray', '9,7')
    .attr('y1', 0)
    .attr('y2', 0);

    this.axes.selectAll('text')
    .attr('transform', 'translate(' + (this.side * 0.2) + ',-5)');

    this.axes.selectAll('.tick')
    .append('line')
    .attr('class', 'grid')
    .attr('x1', (d:number) => this.side * (d * 0.5))
    .attr('x2', (d:number) => this.side * (-d * 0.5 + 1))
    .attr('y1', 0)
    .attr('y2', 0);

    this.axes.append('path')
    .attr('class', 'arrow')
    .attr('d', 'M0 0 L5 9 L2 9 L2 15 L-2 15 L-2 9 L-5 9 Z')
    .attr('transform', 'translate(' + (this.side * 0.5) + ',10)')
    .on('click', (d:string) => this.rotateAxis(d));

    this.axes.append('text')
    .attr('class', 'label')
    .attr('x', this.side * 0.5)
    .attr('y', -6)
    .attr('text-anchor', 'middle')
    .attr('letter-spacing', '-8px')
    .text(d => d)
    .on('click', (d:string) => this.rotateAxis(d));
  }

  private rotateAxis(d: string): void {
    const angle = d === 'i' ? 120 : d === 'ii' ? 240 : 0;
    this.svg.transition().duration(600)
    .attr('transform', 'rotate(' + angle + ',' + (this.side / 2) + ',' + (this.height / 3 * 2) + ')');
  }

  private rotate(angle: number): void {
    this.svg.transition().duration(600).
    attr('transform', 'rotate(' + angle + ',' + (this.side / 2) + ',' + (this.height / 3 * 2) + ')');
  }

  private populate(): void {
    this.r.domain([0, D3.max(this.dpts, (d:Department) =>  d.total)]);

    this.svg.selectAll('.point')
        .data(this.dpts)
        .enter().append('circle')
        .attr('class', 'point')
        .attr('r',  (d:Department) => this.r(d.total))
        .attr('cx', (d:Department) => this.sideScale(d.x))
        .attr('cy', (d:Department) => this.perpScale(d.iiiShare))
        .append('title')
        .text((d:Department) => d.department);
  }

}
