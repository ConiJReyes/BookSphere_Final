import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarsePage } from './registrarse.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertsService } from 'src/app/services/alerts.service'; // Importa el servicio de alertas
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RegistrarsePage', () => {
  let component: RegistrarsePage;
  let fixture: ComponentFixture<RegistrarsePage>;
  let alertaService: jasmine.SpyObj<AlertsService>; // Define el espía de AlertsService

  beforeEach(() => {
    // Crear un espía para AlertsService
    alertaService = jasmine.createSpyObj('AlertsService', ['GenerarAlerta']);

    TestBed.configureTestingModule({
      declarations: [RegistrarsePage],
      providers: [
        DBserviceService,
        {
          provide: SQLite,
          useValue: {} // Mock simple de SQLite
        },
        {
          provide: NativeStorage,
          useValue: {
            getItem: () => Promise.resolve('mock-value'), // Mock de método getItem
            setItem: () => Promise.resolve(), // Mock de método setItem
          }
        },
        { provide: AlertsService, useValue: alertaService } // Proporcionamos el espía para AlertsService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Para manejar componentes personalizados de Ionic
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //PRUEBA UNITARIA
  it('Mostrar alerta si hay algun campo vacio', () => {
    component.username = '';
    component.password = '';
    component.email = '';
    component.passwordR = '';

    component.validacionDatosCorreo();

    expect(alertaService.GenerarAlerta).toHaveBeenCalledWith('ERROR', 'Todos los campos deben ser ingresados');
  });
});
