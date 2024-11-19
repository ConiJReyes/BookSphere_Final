import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdministradorPage } from './administrador.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { MenuController } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Mock de SQLite
class MockSQLite {
  create(options: any) {
    return Promise.resolve();  // Simula la creación de la base de datos
  }
  execute(query: string, params: any[]) {
    return Promise.resolve([]);  // Simula la ejecución de una consulta
  }
}

// Mock de MenuController
class MockMenuController {
  enable(enabled: boolean, menuId: string) {
    // Simplemente simula el comportamiento de 'enable'
    return enabled;
  }
}

describe('AdministradorPage', () => {
  let component: AdministradorPage;
  let fixture: ComponentFixture<AdministradorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministradorPage],
      providers: [
        { provide: DBserviceService, useValue: { seleccionarLibros: jasmine.createSpy() } },  // Mock DBserviceService
        { provide: MenuController, useClass: MockMenuController },  // Usamos el mock detallado de MenuController
        { provide: SQLite, useClass: MockSQLite },  // Proveer el mock de SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministradorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
