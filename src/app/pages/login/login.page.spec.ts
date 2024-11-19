import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AlertsService } from 'src/app/services/alerts.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx'; // Asegúrate de importar esto

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockAlertsService: jasmine.SpyObj<AlertsService>;
  let mockSQLite: jasmine.SpyObj<SQLite>;
  let mockDBservice: jasmine.SpyObj<DBserviceService>;
  let mockNativeStorage: jasmine.SpyObj<NativeStorage>;

  beforeEach(async () => {
    // mocks para las dependencias
    mockAlertsService = jasmine.createSpyObj('AlertsService', ['GenerarAlerta']);
    mockSQLite = jasmine.createSpyObj('SQLite', ['create']);
    mockDBservice = jasmine.createSpyObj('DBserviceService', ['someMethod']);
    mockNativeStorage = jasmine.createSpyObj('NativeStorage', ['setItem']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: AlertsService, useValue: mockAlertsService },
        { provide: SQLite, useValue: mockSQLite },
        { provide: DBserviceService, useValue: mockDBservice },
        { provide: NativeStorage, useValue: mockNativeStorage }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //PRUEBA UNITARIA
  it('Mostrar alerta todos los campos no estan llenos', () => {
    component.usuario = "usuario";
    component.password = '';

    component.inicioSesion();

    expect(mockAlertsService.GenerarAlerta).toHaveBeenCalledWith('Error', 'Debe ingresar datos');
  });
});
