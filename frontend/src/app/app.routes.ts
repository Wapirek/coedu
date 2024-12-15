import { Routes } from '@angular/router';
import { SpaComponent } from "./spa/spa.component";

export const routes: Routes = [
	{
		path: '',
		component: SpaComponent,
		canActivate: []
	},
	{ path: '**', redirectTo: '' },
];
