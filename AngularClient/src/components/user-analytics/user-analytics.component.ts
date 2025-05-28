import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment.prod';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@Component({
  selector: 'app-user-analytics',
  standalone: true,
  imports: [CommonModule, NgChartsModule, MatButtonToggleModule],
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.css']
})
export class UserAnalyticsComponent implements OnInit {

  registrationChartData: any[] = [];
  collageChartData: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadUserRegistrations();
  }

  loadUserRegistrations() {
    this.http.get<Date[]>(`${environment.apiUrl}/User/stats/registration-dates`).subscribe(dates => {
      const grouped = this.groupByDate(dates.map(d => new Date(d)));
      this.registrationChartData = this.convertToChartData(grouped);
    });
  }

  groupByDate(dates: Date[]): Record<string, number> {
    const map: Record<string, number> = {};
    dates.forEach(date => {
      const key = date.toISOString().split('T')[0];
      map[key] = (map[key] || 0) + 1;
    });
    return map;
  }

  convertToChartData(data: Record<string, number>) {
    const labels = Object.keys(data);
    const values = Object.values(data);
    return [{ labels, datasets: [{ data: values, label: 'כמות' }] }];
  }
}
