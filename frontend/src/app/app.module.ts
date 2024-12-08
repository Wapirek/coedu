import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { SitesComponent } from "./sites/sites.components";
import { AppComponent } from "./app.component";

@NgModule({
	declarations: [
		AppComponent,
		SitesComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		provideAnimationsAsync(),
		provideHttpClient(
			withInterceptorsFromDi()
		)
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
