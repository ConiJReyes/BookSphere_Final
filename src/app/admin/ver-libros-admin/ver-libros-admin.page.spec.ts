import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerLibrosAdminPage } from './ver-libros-admin.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';

// Mock de SQLite 
class SQLiteMock {
  executeSql = jasmine.createSpy('executeSql').and.callFake((query: string, params: any[]) => {
    return Promise.resolve();
  });
}

// Mock del servicio DBserviceService
class DBserviceServiceMock {
  selectCategorias() {
    return of([{ id: 1, nombre: 'Categoría de prueba' }]);
  }

  fetchCategoria() {
    return of({ id: 1, nombre: 'Categoría de prueba' });
  }

  seleccionarLibros() {
    return of([
      { id: 1, titulo: 'Libro de prueba 1', autor: 'Autor 1' },
      { id: 2, titulo: 'Libro de prueba 2', autor: 'Autor 2' }
    ]);
  }


  dbEstado() {
    // Devuelve un valor simulado que puede ser usado por el componente
    return of('activo'); 
  }
}

describe('VerLibrosAdminPage', () => {
  let component: VerLibrosAdminPage;
  let fixture: ComponentFixture<VerLibrosAdminPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerLibrosAdminPage],
      providers: [
        {
          provide: DBserviceService,
          useClass: DBserviceServiceMock  
        },
        {
          provide: SQLite,
          useClass: SQLiteMock  
        },
        {
          provide: NativeStorage,
          useValue: {
            getItem: () => Promise.resolve('mock-value'),  // Mock de getItem
            setItem: () => Promise.resolve()  // Mock de setItem
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VerLibrosAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
