import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-libros-estrenos',
  templateUrl: './libros-estrenos.page.html',
  styleUrls: ['./libros-estrenos.page.scss'],
})
export class LibrosEstrenosPage implements OnInit {
  librosEstrenos: any[] = []; 
  cargando: boolean = true;
  
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarLibrosEstrenos(); // Llamamos a la función al inicializar el componente
  }

  // Método para cargar los libros de estreno
  cargarLibrosEstrenos() {
    this.apiService.buscarLibros().subscribe(
      (data) => {
        this.librosEstrenos = data; 
        this.cargando = false; 
      },
      (error) => {
        console.error('Error al cargar libros de estrenos', error); 
        this.cargando = false; 
      }
    );
  }
}
