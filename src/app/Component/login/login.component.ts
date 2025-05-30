import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/auth.service';
import { Router } from '@angular/router';
import { AppRoutes } from '../../shared/routes-enum';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Optional if using styling
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log('Form submitted successfully:', this.loginForm.value);

    this.service.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          if (res.isSuccess) {
            // res.data contains your detailed data object with token, roleId, user etc.
            console.log('Login success:', res.data);
            let data = res.data;

            // Save the token to localStorage (or sessionStorage)
            localStorage.setItem('token', res.data.token ?? '');

            // Optionally save user info or roleId
            localStorage.setItem('roleId', res.data?.roleId);

            // Redirect to dashboard or home page
            this.router.navigate([AppRoutes.home]);  // adjust route as needed
          } else {
            // Handle error message from backend
            alert(res.message || 'Login failed');
          }
        }
      }
    });

  }
}
