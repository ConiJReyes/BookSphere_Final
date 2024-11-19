import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarContraPage } from './cambiar-contra.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ValidationsService } from 'src/app/services/validations.service';

// Mock de servicios
class DBserviceServiceMock {
  modificarContra = jasmine.createSpy('modificarContra').and.returnValue(Promise.resolve());
  revisarIgualdadDeContraAnterior = jasmine.createSpy('revisarIgualdadDeContraAnterior').and.returnValue(Promise.resolve(false));
  traerUsuarioLogueado = jasmine.createSpy('traerUsuarioLogueado').and.returnValue(Promise.resolve());
}

class ActivatedRouteMock {
  queryParams = of({});  
}

class RouterMock {
  navigate = jasmine.createSpy('navigate');
}

class ToastsServiceMock {
  GenerarToast = jasmine.createSpy('GenerarToast');
}

class MenuControllerMock {
  enable = jasmine.createSpy('enable');
}

class AlertsServiceMock {}
class ValidationsServiceMock {
  validarContrasena = jasmine.createSpy('validarContrasena').and.returnValue(true);  //simula la validacion que es exitosa
}

describe('CambiarContraPage', () => {
  let component: CambiarContraPage;
  let fixture: ComponentFixture<CambiarContraPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarContraPage],
      providers: [
        { provide: DBserviceService, useClass: DBserviceServiceMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useClass: RouterMock },
        { provide: ToastsService, useClass: ToastsServiceMock },
        { provide: MenuController, useClass: MenuControllerMock },
        { provide: AlertsService, useClass: AlertsServiceMock },
        { provide: ValidationsService, useClass: ValidationsServiceMock },
        { provide: NativeStorage, useValue: { getItem: () => Promise.resolve('mock-value'), setItem: () => Promise.resolve() } },
        { provide: SQLite, useClass: SQLite }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
