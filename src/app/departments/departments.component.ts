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
  constructor(private dptService: DepartmentService) { }

  ngOnInit() {
    this.dptService.getDepartments().then(dpts => {
      this.dpts = dpts;
    });
    this.yearControl.valueChanges.debounceTime(300).subscribe(newValue => {
      if(newValue >= 1989 && newValue <= 2014) {
        this.year = newValue;
      }
    });

    this.timer = Observable.timer(10, 2500);
    // this.timer = Observable.interval(2500).timeInterval().map((t) => this.increaseYear()).share().pausable(this.pauser);
    // this.timer.subscribe((t) => this.increaseYear());
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
