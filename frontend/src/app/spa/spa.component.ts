import { Component } from '@angular/core';

@Component({
  selector: 'app-spa',
  standalone: false,
  template: `
    <app-navbar />
    <app-main />
  `
})
export class SpaComponent {

}
