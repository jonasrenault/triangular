import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TriangularChartComponent } from './triangular-chart/triangular-chart.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentService } from './department.service';

@NgModule({
  declarations: [
    AppComponent,
    TriangularChartComponent,
    DepartmentsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
