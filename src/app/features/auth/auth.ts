import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);

  _loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage = signal<string>('');

  onSubmit() {
    if (this._loginForm.invalid) return;

    const { email, password } = this._loginForm.value;

    // Hardcoded check
    if (email === 'admin@demo.com' && password === 'admin123') {
      this._authService.login(email);
    } else {
      this.errorMessage.set('Invalid credentials. Try with valid credentials.');
    }
  }
}
