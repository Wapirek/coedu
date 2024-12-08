import { Routes } from '@angular/router';
import { SitesComponent } from "./sites/sites.components";
import { AuthGuard } from "./auth/_guards/auth.guard";

export const routes: Routes = [
	{
		path: '',
		component: SitesComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'auth', loadChildren: () =>
			import('./auth/auth.module').then((m) => m.AuthModule)
	},
	{ path: '**', redirectTo: '' },
];
