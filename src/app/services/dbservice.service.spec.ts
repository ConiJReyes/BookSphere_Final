import { TestBed } from '@angular/core/testing';
import { DBserviceService } from './dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('DBserviceService', () => {
  let service: DBserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DBserviceService,
        {
          provide: SQLite,
          useValue: {}  // Mock vacío de SQLite
        },
        {
          provide: NativeStorage,
          useValue: {
            getItem: () => Promise.resolve('mock-value'),  // Mock del getItem
            setItem: () => Promise.resolve()  // Mock del setItem
          }
        }
      ]
    });
    service = TestBed.inject(DBserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

