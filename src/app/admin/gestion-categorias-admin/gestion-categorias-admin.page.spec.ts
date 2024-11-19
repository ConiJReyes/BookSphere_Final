import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionCategoriasAdminPage } from './gestion-categorias-admin.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { MenuController } from '@ionic/angular';
import { of } from 'rxjs';

// Mock de DBserviceService
class MockDBserviceService {
  selectCategorias() { }
  dbEstado() { return of(true); }
  fetchCategoria() { return of([]); }
  insertarCategoria(categoria: string) { return Promise.resolve(); }
  eliminarCategoria(id: number) { return Promise.resolve(); }
  hayLibrosPorCategoria(id: number) { return Promise.resolve(false); }
}

describe('GestionCategoriasAdminPage', () => {
  let component: GestionCategoriasAdminPage;
  let fixture: ComponentFixture<GestionCategoriasAdminPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCategoriasAdminPage],
      providers: [
        { provide: DBserviceService, useClass: MockDBserviceService },
        { provide: ToastsService, useValue: { GenerarToast: () => {} } },  // Mock para el servicio Toast
        { provide: MenuController, useValue: { enable: () => {} } }  // Mock para MenuController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionCategoriasAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
