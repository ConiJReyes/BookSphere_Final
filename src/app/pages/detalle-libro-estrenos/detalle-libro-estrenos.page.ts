import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detalle-libro-estrenos',
  templateUrl: './detalle-libro-estrenos.page.html',
  styleUrls: ['./detalle-libro-estrenos.page.scss'],
})
export class DetalleLibroEstrenosPage implements OnInit {
  libro: any; 
  cargando: boolean = true; 

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.cargarLibro(); 
  }

  // Método para cargar el libro por ID
  cargarLibro() {
    const idParam = this.route.snapshot.paramMap.get('id'); 

    if (idParam) { 
      const id = +idParam; 
      this.apiService.buscarLibroPorId(id).subscribe(
        (data) => {
          this.libro = data; 
          this.cargando = false; 
        },
        (error) => {
          console.error('Error al cargar el libro', error); 
          this.cargando = false; 
        }
      );
    } else {
      console.error('ID del libro no encontrado en la ruta.'); 
      this.cargando = false;
    }
  }
}
