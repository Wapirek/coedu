import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { BrowserModule } from "@angular/platform-browser";
import { AuthFormComponent } from "./auth-form/auth-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig, MatSnackBarModule } from "@angular/material/snack-bar";

const matSnackbarDefaultConfig: MatSnackBarConfig = {
	verticalPosition: 'bottom',
	horizontalPosition: 'right',
	duration: 2500,
};

@NgModule({
	declarations: [
		AuthComponent,
		AuthFormComponent,
		SignInComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forChild([
			{
				path: '',
				component: AuthComponent,
				children: [
					{ path: '', component: SignInComponent }
				]
			},
		]),
		ReactiveFormsModule,
		MatSnackBarModule,
	],
	providers: [
		{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: matSnackbarDefaultConfig }
	]
})
export class AuthModule {}


