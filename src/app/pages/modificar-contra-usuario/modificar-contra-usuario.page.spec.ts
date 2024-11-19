import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarContraUsuarioPage } from './modificar-contra-usuario.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';
import { ToastsService } from 'src/app/services/toasts.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Mock para SQLite
class MockSQLite {
  create() {
    return Promise.resolve();
  }
}

describe('ModificarContraUsuarioPage', () => {
  let component: ModificarContraUsuarioPage;
  let fixture: ComponentFixture<ModificarContraUsuarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarContraUsuarioPage],
      providers: [
        ToastsService,
        AlertsService,
        MenuController,
        Router,
        {
          provide: DBserviceService,
          useValue: {} 
        },
        {
          provide: NativeStorage,
          useValue: {
            setItem: jasmine.createSpy('setItem').and.returnValue(Promise.resolve()),
            getItem: jasmine.createSpy('getItem').and.returnValue(Promise.resolve('some data')),
            remove: jasmine.createSpy('remove').and.returnValue(Promise.resolve())
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ usuarioSeleccionado: 1 })
          }
        },
        {
          provide: SQLite, 
          useClass: MockSQLite
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarContraUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
