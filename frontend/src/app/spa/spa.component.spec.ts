import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaComponent } from './spa.component';
import { AppModule } from "../app.module";

describe('SpaComponent', () => {
  let component: SpaComponent;
  let fixture: ComponentFixture<SpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
