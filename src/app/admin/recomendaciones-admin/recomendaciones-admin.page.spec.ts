import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomendacionesAdminPage } from './recomendaciones-admin.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';

// Mock de SQLite
const SQLiteMock = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
  executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())
};

// Mock de DBserviceService
const DBserviceServiceMock = {
  selectRecomendaciones: jasmine.createSpy('selectRecomendaciones'),
  dbEstado: jasmine.createSpy('dbEstado').and.returnValue(of(true)),  
  fetchRecomendacion: jasmine.createSpy('fetchRecomendacion').and.returnValue(of([])), 
  eliminarRecomendacion: jasmine.createSpy('eliminarRecomendacion').and.returnValue(Promise.resolve())
};

describe('RecomendacionesAdminPage', () => {
  let component: RecomendacionesAdminPage;
  let fixture: ComponentFixture<RecomendacionesAdminPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecomendacionesAdminPage],
      providers: [
        { provide: SQLite, useValue: SQLiteMock }, 
        { provide: DBserviceService, useValue: DBserviceServiceMock }  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecomendacionesAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
