import { Component, OnInit } from '@angular/core';
import { Department } from '../department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  public dpts : Department[];
  constructor(private dptService: DepartmentService) { }

  ngOnInit() {
    this.dptService.getDepartments().then(dpts => {
      this.dpts = dpts;
    });
  }

}
