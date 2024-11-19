import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleslibroPage } from './detalleslibro.page';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

//si funciona no lo toques dicen :"")

// Mock Services
class MockDBserviceService {
  verificarLibroGuardado(id: number, isbn: string) {
    return Promise.resolve(false); 
  }
  guardarLibrosPerfil(id: number, isbn: string) {
    return Promise.resolve(); 
  }
  obtenerResenasPorISBN(isbn: string) {
    return Promise.resolve([{ texto: 'Reseña 1', autor: 'Autor 1' }]); // Mock reseñas
  }
}

class MockToastsService {
  GenerarToast(message: string, duration: number, position: string) {
    console.log(message); 
  }
}

class MockNativeStorage {
  getItem(key: string) {
    return Promise.resolve(1); 
  }
}

class MockActivatedRoute {
  queryParams = of({}); 
}

describe('DetalleslibroPage', () => {
  let component: DetalleslibroPage;
  let fixture: ComponentFixture<DetalleslibroPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleslibroPage],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: DBserviceService, useClass: MockDBserviceService },
        { provide: ToastsService, useClass: MockToastsService },
        { provide: NativeStorage, useClass: MockNativeStorage },
        MenuController,
        Router,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleslibroPage);
    component = fixture.componentInstance;

    // Definir un libro de prueba para evitar el error de undefine
    component.libro = { ISBN: '1234567890', titulo: 'Libro de Prueba', autor: 'Autor de Prueba' };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
