import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionComentarioLibroPage } from './gestion-comentario-libro.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { MenuController } from '@ionic/angular';
import { of } from 'rxjs';

// Mock para DBserviceService
class MockDBserviceService {
  selectResenas() { }
  dbEstado() { return of(true); }
  fetchResenas() { return of([]); }
  eliminarResena(id: number) { return Promise.resolve(); }
  actualizarBanResena(estado: boolean, idResena: number) { return Promise.resolve(); }
}

// Mock para ToastsService
class MockToastsService {
  GenerarToast(mensaje: string, tiempo: number, posicion: string) {
    console.log(mensaje);
  }
}

// Mock para MenuController
class MockMenuController {
  enable(isEnabled: boolean, menuId: string) { }
}

describe('GestionComentarioLibroPage', () => {
  let component: GestionComentarioLibroPage;
  let fixture: ComponentFixture<GestionComentarioLibroPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionComentarioLibroPage],
      providers: [
        { provide: DBserviceService, useClass: MockDBserviceService },
        { provide: ToastsService, useClass: MockToastsService },
        { provide: MenuController, useClass: MockMenuController },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionComentarioLibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
