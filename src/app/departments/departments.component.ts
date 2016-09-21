import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  public dpts : Department[];
  public year: number = 1989;
  public yearControl = new FormControl();
  private timer: Observable<number>;
  private loop = false;
  private subscription;
  private filters: Array<Department>;
  constructor(private dptService: DepartmentService) { }

  ngOnInit() {
    this.dptService.getDepartments().then(dpts => {
      this.dpts = dpts;
      this.filters = new Array<Department>();
      this.dpts.forEach((elt: Department) => {
        if (!this.filters.some((filter: Department) => filter.department === elt.department)) this.filters.push(elt);
      });
      this.filters.sort((a: Department, b: Department) => a.department < b.department ? -1 : 1);
    });
    this.yearControl.valueChanges.debounceTime(300).subscribe(newValue => {
      if(newValue >= 1989 && newValue <= 2014) {
        this.year = newValue;
      }
    });

    this.timer = Observable.timer(10, 2500);
  }

  private increaseYear(): void {
    if (this.year < 1989 || this.year >= 2014) {
      this.year = 1989;
    } else {
      this.year++;
    }
  }

  public onLoopChange():void {
    if (this.loop) {
      this.subscription = this.timer.subscribe((t) => this.increaseYear());
    } else {
      this.subscription.unsubscribe();
    }
  }

}
