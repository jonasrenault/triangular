import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { FormControl } from '@angular/forms';

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
  constructor(private dptService: DepartmentService) { }

  ngOnInit() {
    this.dptService.getDepartments().then(dpts => {
      this.dpts = dpts;
    });
    this.yearControl.valueChanges.debounceTime(300).subscribe(newValue => {
      if(newValue > 1989 && newValue < 2014) {
        this.year = newValue;
      }
    });
  }

}
