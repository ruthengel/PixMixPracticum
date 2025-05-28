import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router: Router) { }


  ngOnInit(): void {
    console.log('Home component initialized');
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

}
