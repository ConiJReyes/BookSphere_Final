import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResenaUsuarioPage } from './resena-usuario.page';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

// Mock Services
class MockDBserviceService {
  eliminarResena(id: number) {}
  selecResenasUsuario(id: number) {}
  actualizarResenaUsuario(id: number, resenaTexto: string) {}
}

class MockToastsService {
  GenerarToast(message: string, duration: number, position: string) {}
}

class MockNativeStorage {
  getItem(key: string) {
    return Promise.resolve(1); 
  }
}

describe('ResenaUsuarioPage', () => {
  let component: ResenaUsuarioPage;
  let fixture: ComponentFixture<ResenaUsuarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResenaUsuarioPage],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { 
            queryParams: of({ resena: { titulo: 'Test Titulo', texto_resena: 'Test Resena' } }) 
          } 
        },
        { provide: DBserviceService, useClass: MockDBserviceService },
        { provide: ToastsService, useClass: MockToastsService },
        { provide: NativeStorage, useClass: MockNativeStorage },
        MenuController,
        Router,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResenaUsuarioPage);
    component = fixture.componentInstance;

    
    component.resena = { titulo: '', texto_resena: '' };

    
    fixture.detectChanges();

    
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

});
