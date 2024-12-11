import { Component } from '@angular/core';
import { FormField } from "../auth-form/_models/form-field.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AuthService} from "../auth.service";
import { first } from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sign-in',
  standalone: false,
  template: `<app-auth-form
      [fields]="fields"
      [title]="title"
      [btnTxt]="btnTxt"
      [fieldsForm]="fieldsForm"
      [errMsg]="errMsg"
      (submitEvt)="signIn($event)"
  ></app-auth-form>`
})
export class SignInComponent {
  fieldsForm: FormGroup;
  title = 'Logowanie';
  btnTxt = 'Zaloguj się';
  errMsg = '';
  fields: FormField[] = [
    {
      id: 'username',
      type: 'text',
      label: 'Nazwa użytkownika',
      placeholder: 'user',
      required: true
    },
    {
      id: 'password',
      type: 'password',
      label: 'Hasło',
      placeholder: '*****',
      required: true
    }
  ];

  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private snackBar: MatSnackBar,
  ) {

    this.fieldsForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(255),
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.minLength(1),
          Validators.maxLength(255),
        ])
      ],
    });
  }

  signIn(fieldsInput: any): void {
    this.authService.signIn(fieldsInput.username, fieldsInput.password).pipe(
        first()
    ).subscribe(
        () => {
          this.snackBar.open('Zalogownao');
        },
        () => {
          this.fieldsForm.reset();
          this.snackBar.open('Cos poszło nie tak');
        }
    )
  }
}
