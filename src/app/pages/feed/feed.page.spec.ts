import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedPage } from './feed.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { of } from 'rxjs'; 
import { MenuController } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx'; 
import { AlertsService } from 'src/app/services/alerts.service';

describe('FeedPage', () => {
  let component: FeedPage;
  let fixture: ComponentFixture<FeedPage>;

  // Mock del servicio SQLite
  class SQLiteMock {
    executeSql = jasmine.createSpy().and.returnValue(Promise.resolve());
  }

  // Mock del servicio DBserviceService
  class DBserviceServiceMock {
    selectCategorias = jasmine.createSpy().and.returnValue(of([]));
    fetchCategoria = jasmine.createSpy().and.returnValue(of([]));
    obtenerLibrosPopulares = jasmine.createSpy().and.returnValue(of([]));
    fetchLibrosPopulares = jasmine.createSpy().and.returnValue(of([]));
    seleccionarLibros = jasmine.createSpy().and.returnValue(of([]));
    fetchLibros = jasmine.createSpy().and.returnValue(of([]));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedPage ],
      providers: [
        { provide: DBserviceService, useClass: DBserviceServiceMock }, 
        { provide: SQLite, useClass: SQLiteMock },
        MenuController,
        Router,
        NativeStorage,
        AlertsService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
