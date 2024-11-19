import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPerfilUsuarioPage } from './modificar-perfil-usuario.page';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; 
import { MenuController } from '@ionic/angular';
import { ToastsService } from 'src/app/services/toasts.service';
import { CameraService } from 'src/app/services/camera.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Mock para SQLite
class SQLiteMock {
  executeSql = jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({ rows: [] })); 
  close = jasmine.createSpy('close').and.returnValue(Promise.resolve()); 
}

describe('ModificarPerfilUsuarioPage', () => {
  let component: ModificarPerfilUsuarioPage;
  let fixture: ComponentFixture<ModificarPerfilUsuarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarPerfilUsuarioPage],
      providers: [
        ToastsService,
        CameraService,
        AlertsService,
        MenuController,
        Router,
        {
          provide: DBserviceService,
          useValue: {
            someMethod: jasmine.createSpy('someMethod').and.returnValue(Promise.resolve())
          }
        },
        {
          provide: SQLite,
          useClass: SQLiteMock
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ usuarioSeleccionado: 1 }) 
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPerfilUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
