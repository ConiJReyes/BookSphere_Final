import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosLosLibrosPage } from './todos-los-libros.page';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { of } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 


class MockSQLite {
  
}

class MockDBserviceService {

  selectCategorias() {
    return of([]); 
  }
  fetchCategoria() {
    return of([]);
  }
  obtenerLibrosPopulares() {
    return of([]); 
  }
  fetchLibrosPopulares() {
    return of([]); 
  }
  seleccionarLibros() {
    return of([]); 
  }
  fetchLibros() {
    return of([]); 
  }

  dbEstado() {
    return of(true); 
  }
}

describe('TodosLosLibrosPage', () => {
  let component: TodosLosLibrosPage;
  let fixture: ComponentFixture<TodosLosLibrosPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosLosLibrosPage],
      imports: [HttpClientTestingModule], 
      providers: [
        { provide: DBserviceService, useClass: MockDBserviceService },
        { provide: SQLite, useClass: MockSQLite }, 
        NativeStorage,
        Router, 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosLosLibrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
