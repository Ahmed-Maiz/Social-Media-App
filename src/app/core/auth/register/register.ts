import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthServices } from '../../services/auth-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Navbar, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authServices = inject(AuthServices);
  private readonly router = inject(Router);
  private readonly cor = inject(ChangeDetectorRef);
  private readonly Fb = inject(FormBuilder);
  messageNext: string = '';

  messageError: string = '';
  isShow: boolean = false;

  registerForm: FormGroup = this.Fb.group(
    {
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      dateOfBirth: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      rePassword: [null, [Validators.required]],
    },
    { validators: this.confirmPassword },
  );

  isSubmit() {
    this.isShow = true;
    if (this.registerForm.valid) {
      this.authServices.sayUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.messageError = '';
          this.messageNext = res.message;
          this.isShow = false;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
          this.cor.detectChanges();
        },
        error: (err) => {
          console.log(err);
          this.isShow = false;
          this.messageNext = '';
          this.messageError = err.error.message;
          this.cor.detectChanges();
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.isShow = false;
    }
  }

  confirmPassword(group: any) {
    let passwordValue = group.get('password').value;

    let rePasswordValue = group.get('rePassword').value;

    if (passwordValue === rePasswordValue) {
      return null;
    } else {
      return { mismatch: true };
    }
  }
}

// {
//   "name": "Ahmed Bahnasy",
//   "username": "Bahnasy202222",
//   "email": "bahnasyd20222@gmail.com",
//   "dateOfBirth": "2000-01-01",
//   "gender": "male",
//   "password": "Aa@123456",
//   "rePassword": "Aa@123456"
// }
