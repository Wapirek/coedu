import { Component, Input } from '@angular/core';
import { FormField } from "./_models/form-field.model";

@Component({
  selector: 'app-auth-form',
  standalone: false,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  @Input() protected title = '';
  @Input() protected fields: FormField[] = [];

}
