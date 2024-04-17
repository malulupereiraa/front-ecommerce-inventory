import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AsteriskFormDirective } from 'src/app/@core/directives/asterisk-form/asterisk-form.directive';
import { AuthService } from 'src/app/@core/services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [CommonModule, MatButtonModule, AsteriskFormDirective, ReactiveFormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {

  form: FormGroup = new FormGroup({});
  submitted = false;
  authService = inject(AuthService);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.setProdutoForm();
    this.redirectToHomeWhenLogged();
  }

  setProdutoForm(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(40)
          ]
        ],
      },
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  validateFormOnRealTime(): void {
    this.submitted = true
    if (this.form.invalid) {
      return;
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authService.login(
      this.form.value
    ).subscribe((res) => {
      this.router.navigate(['/home']);
    })
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  redirectToHomeWhenLogged(): void {
    if (this.authService.isLoggedIn() && window.location.href.indexOf("login") != -1) {
      this.router.navigate(['/home']);
    }
  }

}
