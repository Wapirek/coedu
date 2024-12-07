import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { BrowserModule } from "@angular/platform-browser";
import { AuthFormComponent } from "./auth-form/auth-form.component";

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
		])
	]
})
export class AuthModule {}
