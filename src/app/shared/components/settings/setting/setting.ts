import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthServices } from '../../../../core/services/auth-services';
import { NavbarHome } from '../../navbar/navbar-home/navbar-home';

@Component({
  selector: 'app-setting',
  imports: [ReactiveFormsModule, NavbarHome],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {
  private fb = inject(FormBuilder);
  private readonly authServices = inject(AuthServices);

  passwordForm: FormGroup = this.fb.group(
    {
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      // هنا ممكن تضيف Validator مخصص للتأكد إن الباسورد متطابق
    },
  );

  updatePassword() {
    if (this.passwordForm.valid) {
      this.authServices.changPassowrd(this.passwordForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
