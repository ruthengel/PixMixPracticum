import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatExpansionModule, MatListModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent {

  loginForm!: FormGroup
  constructor(private authService: AuthService, private fb: FormBuilder, private Router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]]
      }
    )
  }

  get form() {
    return this.loginForm.controls
  }

  logIn() {
    this.Router.navigate(['/']);
    this.authService.logIn(this.loginForm.value).subscribe({
      next: (response) => {
        const decoded: any = jwtDecode(response.token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (role === 'Admin') {
          this.authService.saveToken(response.token)
          alert(response.message)
        }
        else
        alert(`You don't have match permission!`)
      },
      error: (e) => { alert(e.error.messege) }
    })
  }
}
