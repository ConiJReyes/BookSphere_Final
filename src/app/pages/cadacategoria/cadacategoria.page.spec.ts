import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadacategoriaPage } from './cadacategoria.page';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; 
import { MenuController } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';

// Mock de DBserviceService
class DBserviceMock {
  seleccionarLibrosPorCategoria = jasmine.createSpy('seleccionarLibrosPorCategoria').and.returnValue(Promise.resolve([])); // Simula el método
}

describe('CadacategoriaPage', () => {
  let component: CadacategoriaPage;
  let fixture: ComponentFixture<CadacategoriaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadacategoriaPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ idcategoria: 1 }) 
          }
        },
        {
          provide: DBserviceService,
          useClass: DBserviceMock 
        },
        MenuController,
        Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadacategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
