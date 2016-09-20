import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Department } from './department';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DepartmentService {

  private dptsUrl = 'app/sectors.json';  // URL to web api

  constructor(private http: Http) { }

  getDepartments(): Promise<Department[]> {
    return this.http.get(this.dptsUrl)
               .toPromise()
               .then(response => response.json().map(elt => new Department(elt.i, elt.ii, elt.iii, elt.department)) )
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
