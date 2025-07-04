import { NgIf, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AppRoutes } from '../../shared/NavigationRoutes';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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

  Jump() {

  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.service.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          let data = res.data;

          localStorage.setItem(environment.identity_type, res.data.token ?? '');

          this.router.navigate([AppRoutes.home]);
        } else {
          alert(res.message || 'Login failed');
        }
      }
    });

  }
}
