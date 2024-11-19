import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosGuardadosDetallesPage } from './libros-guardados-detalles.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

// Mock de DBserviceService y SQLite
const DBserviceServiceMock = {
  detallesLibrosGuardados: jasmine.createSpy('detallesLibrosGuardados').and.returnValue(Promise.resolve({})),
  actualizarEstadoLibro: jasmine.createSpy('actualizarEstadoLibro').and.returnValue(Promise.resolve()),
  actualizarPaginaActual: jasmine.createSpy('actualizarPaginaActual').and.returnValue(Promise.resolve()),
  actualizarFavorito: jasmine.createSpy('actualizarFavorito').and.returnValue(Promise.resolve()),
  eliminarGuardado: jasmine.createSpy('eliminarGuardado').and.returnValue(Promise.resolve()),
  enviarResena: jasmine.createSpy('enviarResena').and.returnValue(Promise.resolve()),
  obtenerLibrosPopulares: jasmine.createSpy('obtenerLibrosPopulares').and.returnValue(Promise.resolve())
};

describe('LibrosGuardadosDetallesPage', () => {
  let component: LibrosGuardadosDetallesPage;
  let fixture: ComponentFixture<LibrosGuardadosDetallesPage>;
  let toastSpy: jasmine.SpyObj<ToastsService>; // Espía para el servicio de Toasts

  beforeEach(() => {
    toastSpy = jasmine.createSpyObj('ToastsService', ['GenerarToast']);  // Espía para GenerarToast

    TestBed.configureTestingModule({
      declarations: [LibrosGuardadosDetallesPage],
      providers: [
        { provide: ToastsService, useValue: toastSpy },  // Inyectamos el espía
        { provide: DBserviceService, useValue: DBserviceServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ isbnEnviar: 'mockIsbn', idusuarioEnviar: 1 }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LibrosGuardadosDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //PRUEBA UNITARIA
  it('La reseña no puede estar vacia, asi que muestra mensaje', () => {
    component.resena = '';

    component.guardarResena();
    expect(toastSpy.GenerarToast).toHaveBeenCalledWith('La reseña no puede estar vacía', 2000, 'bottom');
  });
});
