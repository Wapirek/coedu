import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormField } from "./_models/form-field.model";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-auth-form',
  standalone: false,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  @Input() public title = '';
  @Input() public fields: FormField[] = [];
  @Input() public btnTxt = 'Zaloguj się';
  @Input() public errMsg = '';
  @Input() public fieldsForm!: FormGroup;

  @Output() submitEvt: EventEmitter<any> = new EventEmitter<any>();
}
