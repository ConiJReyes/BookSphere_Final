import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnadirLibrosAdminPage } from './anadir-libros-admin.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ToastsService } from 'src/app/services/toasts.service';
import { CameraService } from 'src/app/services/camera.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { of } from 'rxjs'; 

describe('AnadirLibrosAdminPage', () => {
  let component: AnadirLibrosAdminPage;
  let fixture: ComponentFixture<AnadirLibrosAdminPage>;
  let toastServiceSpy: jasmine.SpyObj<ToastsService>;

  // Mock de servicios
  const mockDBService = {
    insertarLibros: jasmine.createSpy('insertarLibros'),
    selectCategorias: jasmine.createSpy('selectCategorias'),
    fetchCategoria: jasmine.createSpy('fetchCategoria').and.returnValue(of([])), 
  };

  const mockSQLite = {};

  beforeEach(() => {
    // Crear un spy de ToastsService
    toastServiceSpy = jasmine.createSpyObj('ToastsService', ['GenerarToast']);

    TestBed.configureTestingModule({
      declarations: [AnadirLibrosAdminPage],
      providers: [
        { provide: DBserviceService, useValue: mockDBService },
        { provide: SQLite, useValue: mockSQLite },
        { provide: Router, useValue: {} },
        { provide: ToastsService, useValue: toastServiceSpy },
        MenuController,
        CameraService,
        AlertsService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirLibrosAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //PRUEBA UNITARIA
  it('Mostrar un toast si hay campos vacios', () => {
    component.isbnLibAnadir = '';
    component.nomLibAnadir = '';
    component.autorLibAnadir = '';
    component.categoriaLibAnadir = null!;
    component.paginasLibAnadir = null!;
    component.sinopsisLibAnadir = '';
    component.urlImagen = '';

    component.validacionAnadirLibro();
    
    expect(toastServiceSpy.GenerarToast).toHaveBeenCalledWith(
      'Ingrese todos los campos para agregar el libro', 
      2000, 
      'bottom'
    );
  });
});
