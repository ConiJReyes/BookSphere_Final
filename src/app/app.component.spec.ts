import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { AlertsService } from './services/alerts.service';
import { DBserviceService } from './services/dbservice.service';

class MockNativeStorage {
  set(key: string, value: any) {
    return Promise.resolve(true);  
  }
  get(key: string) {
    return Promise.resolve(null);
  }
  remove(key: string) {
    return Promise.resolve(); 
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: NativeStorage, useClass: MockNativeStorage },  // Proveer el mock de NativeStorage
        { provide: Router, useValue: {} },  // Simular Router 
        { provide: MenuController, useValue: {} },  // Simular MenuController 
        { provide: AlertsService, useValue: {} },  // Simular AlertsService 
        { provide: DBserviceService, useValue: {} },  // Simular DBserviceService 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
