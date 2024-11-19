import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContraPage } from './recuperar-contra.page';
import { MenuController } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

import { EmailService } from 'src/app/services/email.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RecuperarContraPage', () => {
  let component: RecuperarContraPage;
  let fixture: ComponentFixture<RecuperarContraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarContraPage],
      providers: [
        MenuController,
        DBserviceService,
        AlertsService,
        NativeStorage,
        EmailService,
        ToastsService,
        { provide: SQLite, useValue: {} } 
      ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
