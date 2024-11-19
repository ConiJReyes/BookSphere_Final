import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomendacionesPage } from './recomendaciones.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ToastsService } from 'src/app/services/toasts.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { MenuController } from '@ionic/angular';

// Mock de SQLite
class MockSQLite {
  executeSql(query: string, params: any[]) {
    return Promise.resolve({
      rows: {
        length: 1,  
        item: (index: number) => {
          return { id: 1, nombre: 'Categoría 1' }; 
        }
      }
    });
  }
}

// Mock de NativeStorage
class MockNativeStorage {
  getItem(key: string) {
    return Promise.resolve(1);  
  }
  setItem(key: string, value: any) {
    return Promise.resolve();
  }
  removeItem(key: string) {
    return Promise.resolve();
  }
}

describe('RecomendacionesPage', () => {
  let component: RecomendacionesPage;
  let fixture: ComponentFixture<RecomendacionesPage>;
  let toastService: ToastsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RecomendacionesPage ],
      providers: [
        DBserviceService,
        { provide: SQLite, useClass: MockSQLite },
        { provide: NativeStorage, useClass: MockNativeStorage },
        ToastsService,
        AlertsService,
        MenuController,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendacionesPage);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    //PRUEBA UNITARIA
  it('Mostrar toast si esta vacia la recomendacion', () => {
    spyOn(toastService, 'GenerarToast');  
    component.recomendacion = '';  
    component.EnviarRecomendacion();  
    expect(toastService.GenerarToast).toHaveBeenCalledWith(
      'Ingrese una recomendacion para continuar', 3000, 'bottom'
    );
  });
});
