import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionUsuarioAdminPage } from './gestion-usuario-admin.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastsService } from 'src/app/services/toasts.service';
import { MenuController } from '@ionic/angular';

class MockSQLite {
  open() {
    return Promise.resolve();
  }
}

// Mock para DBserviceService
class MockDBService {
  seleccionarUsuarios() {
    return { subscribe: (cb: any) => cb([]) }; // Simulacion de respuesta vacia
  }

  dbEstado() {
    return { subscribe: (cb: any) => cb(true) };  // Simula un estado de base de datos
  }

  fetchUsuario() {
    return { subscribe: (cb: any) => cb([]) };  // Simula la obtencion de un usuario
  }

  actualizarBanUsuario() {
    return Promise.resolve();  // Simula la actualizacion
  }

  actualizarCambioDeRol() {
    return Promise.resolve();  // Simula el cambio de rol
  }
}

describe('GestionUsuarioAdminPage', () => {
  let component: GestionUsuarioAdminPage;
  let fixture: ComponentFixture<GestionUsuarioAdminPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionUsuarioAdminPage ],
      providers: [
        { provide: DBserviceService, useClass: MockDBService }, 
        { provide: SQLite, useClass: MockSQLite }, 
        ToastsService,
        MenuController,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionUsuarioAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
