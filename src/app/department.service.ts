import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Department } from './department';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DepartmentService {

  private dptsUrl = 'assets/sectors_by_year_dpt.json';  // URL to web api

  constructor(private http: Http) { }

  getDepartments(): Promise<Department[]> {
    return this.http.get(this.dptsUrl)
               .toPromise()
               .then(response => response.json().map(elt => {
                 const i = elt['Agriculture'];
                 const ii = elt['Industrie'] + elt['Construction'];
                 const iii = elt['Tertiaire marchant'] + elt['Tertiaire nonmarchant'];
                 return new Department(i, ii, iii, elt.Department, elt.Year);
               }))
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
