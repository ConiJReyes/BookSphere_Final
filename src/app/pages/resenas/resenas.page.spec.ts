import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResenasPage } from './resenas.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { of } from 'rxjs';

// Mock de SQLite
const SQLiteMock = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
  executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())
};

// Mock de NativeStorage
const NativeStorageMock = {
  getItem: jasmine.createSpy('getItem').and.returnValue(Promise.resolve(1)),  
  setItem: jasmine.createSpy('setItem').and.returnValue(Promise.resolve()),
  removeItem: jasmine.createSpy('removeItem').and.returnValue(Promise.resolve())
};

// Mock de DBserviceService
const DBserviceServiceMock = {
  selectResenas: jasmine.createSpy('selectResenas'),
  fetchResenas: jasmine.createSpy('fetchResenas').and.returnValue(of([])),
  insertarRecomendacion: jasmine.createSpy('insertarRecomendacion')
};

describe('ResenasPage', () => {
  let component: ResenasPage;
  let fixture: ComponentFixture<ResenasPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResenasPage],
      providers: [//de los 3 usa los mocks
        { provide: SQLite, useValue: SQLiteMock },  
        { provide: NativeStorage, useValue: NativeStorageMock },  
        { provide: DBserviceService, useValue: DBserviceServiceMock }  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ResenasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
