import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleLibroEstrenosPage } from './detalle-libro-estrenos.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http'; 

describe('DetalleLibroEstrenosPage', () => {
  let component: DetalleLibroEstrenosPage;
  let fixture: ComponentFixture<DetalleLibroEstrenosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleLibroEstrenosPage],
      imports: [HttpClientModule], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue('1') // Simula el método 'get' para el parámetro 'id'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleLibroEstrenosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
