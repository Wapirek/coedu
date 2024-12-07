import { Routes } from '@angular/router';
import { SitesComponent } from "./sites/sites.components";

export const routes: Routes = [
	{
		path: '',
		component: SitesComponent
	},
	{
		path: 'auth', loadChildren: () =>
			import('./auth/auth.module').then((m) => m.AuthModule)
	},
	{ path: '**', redirectTo: '' },
];
