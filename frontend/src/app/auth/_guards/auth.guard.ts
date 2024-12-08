import {
	ActivatedRouteSnapshot,
	CanActivateFn,
	Router,
	RouterStateSnapshot,
	UrlTree
} from '@angular/router';
import { AuthService } from "../auth.service";
import { first, map, Observable } from "rxjs";
import { User } from "../_models/user.model";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
	Observable<boolean | UrlTree>
	| Promise<boolean | UrlTree>
	| boolean
	| UrlTree =>  {

		const authService = inject(AuthService);

		return authService.user.pipe(
			first(),
			map((user: User | null) => !!user ? true : authService.router.createUrlTree(['/auth'])),
		)
}
