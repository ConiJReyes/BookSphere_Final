import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilusuarioPage } from './perfilusuario.page';
import { IonicModule } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('PerfilusuarioPage', () => {
  let component: PerfilusuarioPage;
  let fixture: ComponentFixture<PerfilusuarioPage>;
  let mockNativeStorage: jasmine.SpyObj<NativeStorage>;
  let mockSQLite: jasmine.SpyObj<SQLite>;

  beforeEach(async () => {
    //mocks de NativeStorage y SQLite
    mockNativeStorage = jasmine.createSpyObj('NativeStorage', ['getItem', 'setItem', 'removeItem']);
    mockSQLite = jasmine.createSpyObj('SQLite', ['create']);

    await TestBed.configureTestingModule({
      declarations: [PerfilusuarioPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: NativeStorage, useValue: mockNativeStorage },
        { provide: SQLite, useValue: mockSQLite },
        DBserviceService 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilusuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
