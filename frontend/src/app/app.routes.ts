import { Routes } from '@angular/router';
import { SpaComponent } from "./spa/spa.component";

export const routes: Routes = [
	{
		path: '',
		component: SpaComponent,
		canActivate: []
	},
	{
		path: 'auth', loadChildren: () =>
			import('./auth/auth.module').then((m) => m.AuthModule)
	},
	{ path: '**', redirectTo: '' },
];
