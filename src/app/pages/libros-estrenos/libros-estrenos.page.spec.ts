import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosEstrenosPage } from './libros-estrenos.page';
import { ApiService } from 'src/app/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LibrosEstrenosPage', () => {
  let component: LibrosEstrenosPage;
  let fixture: ComponentFixture<LibrosEstrenosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibrosEstrenosPage],
      imports: [HttpClientTestingModule], 
      providers: [ApiService] 
    }).compileComponents();

    fixture = TestBed.createComponent(LibrosEstrenosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
