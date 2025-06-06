import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/Services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AppRoutes } from '../../shared/NavigationRoutes';

@Component({
  selector: 'app-register',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide = true;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private service: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['',
        [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)
        ]],
      dateOfBirth: ['', Validators.required],
      mobileNo: ['', [Validators.pattern(/^[0-9+\- ]*$/), Validators.maxLength(15)]],
      roleId: [null]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.service.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registered successfully', response);
          this.router.navigate([AppRoutes.login])
        },
        error:(err) => {
          console.log('Registration Failed', err)
        }
      })
    }
  }
}
