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
  selector: 'app-login',
  imports: [Navbar, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly httpClient = inject(AuthServices);
  private readonly router = inject(Router);
  private readonly cor = inject(ChangeDetectorRef);
  private readonly Fb = inject(FormBuilder);
  messageNext: string = '';
  messageError: string = '';
  isShow: boolean = false;
  loginForms: FormGroup = this.Fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  });
  login: any;

  isLogin() {
    if (this.loginForms.valid) {
      this.isShow = true;
      this.httpClient.saylogin(this.loginForms.value).subscribe({
        next: (res) => {
          this.isShow = false;
          this.messageError = '';
          this.messageNext = res.message;

          console.log(res);
          this.cor.detectChanges();
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
          localStorage.setItem('token', res.data.token);
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
      this.loginForms.markAllAsTouched();
    }
  }
}
