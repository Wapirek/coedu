import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserModule } from "@angular/platform-browser";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { MainComponent } from "./spa/main/main.component";
import { NavbarComponent } from "./spa/navbar/navbar.component";
import { SpaComponent } from "./spa/spa.component";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
	declarations: [
		AppComponent,
		SpaComponent,
		MainComponent,
		NavbarComponent,
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules
		}),
		MatIconModule,
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
