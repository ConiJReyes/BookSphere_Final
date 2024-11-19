import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnviarcodigoPage } from './enviarcodigo.page';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { EmailService } from 'src/app/services/email.service';
import { ToastsService } from 'src/app/services/toasts.service';

describe('EnviarcodigoPage', () => {
  let component: EnviarcodigoPage;
  let fixture: ComponentFixture<EnviarcodigoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviarcodigoPage ],
      providers: [
        EmailService,
        ToastsService,
        AlertsService,
        MenuController,
        { provide: ActivatedRoute, useValue: { queryParams: of({ envioId: { id_usuario: 1 } }) } },  
        Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EnviarcodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
