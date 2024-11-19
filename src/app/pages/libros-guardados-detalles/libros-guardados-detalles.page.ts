import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-libros-guardados-detalles',
  templateUrl: './libros-guardados-detalles.page.html',
  styleUrls: ['./libros-guardados-detalles.page.scss'],
})
export class LibrosGuardadosDetallesPage implements OnInit {

  isbn!: string;
  idUsuario!: number;
  libro: any
  
  resena: string = ''
  paginaActual: number = 0
  cantidadPaginas: number = 0
  estadoLibro : string = ""
  idguardado!: number

  
  constructor(private route : ActivatedRoute, private bd : DBserviceService, private menu: MenuController, private router: Router, private toast : ToastsService) {

    this.menu.enable(true, 'MenuPrincipal');
    this.menu.enable(false, 'MenuAdministrador');

    this.route.queryParams.subscribe(params => {
    if(this.router.getCurrentNavigation()?.extras.state){
      this.isbn = this.router.getCurrentNavigation()?.extras?.state?.['isbnEnviar']
      this.idUsuario = this.router.getCurrentNavigation()?.extras?.state?.['idusuarioEnviar']
      this.cargarDetallesLibro()
    }
  })

   
  }
  ngOnInit() {
    
  }

  

  cargarDetallesLibro() {
  this.bd.detallesLibrosGuardados(this.idUsuario, this.isbn).then(libro => {
    if (libro) {

      this.libro = libro;
      this.paginaActual = libro.pagina_actual
      this.estadoLibro = libro.estado_lectura
      this.cantidadPaginas = libro.cantidad_paginas
      this.idguardado = libro.id_guardados
    } else {
      console.error("No se encontraron detalles para el libro.");
    }
  }).catch(error => {
    console.error("Error cargando los detalles del libro: ", error);
  });
}

validarInput(event: any) {
  const inputValue = event.target.value;
  if (inputValue < 0) {
    this.paginaActual = 0;
  }
  if (inputValue > this.cantidadPaginas) {
    this.paginaActual = this.cantidadPaginas;
  }
}





  cambiarEstadoLibro(evento : any){
    const nuevoEstadoLibro = evento.detail.value
    this.bd.actualizarEstadoLibro(this.idUsuario,this.isbn,nuevoEstadoLibro).then(()=>{
      this.toast.GenerarToast('Estado del libro actualizado',2000,'bottom')
    }).catch(error => {
      console.error('Error al actualizar el estado del libro:', error);
    });
  }

  cambiarPaginaActual(evento: any) {

    const nuevaPag= evento.detail.value
    this.bd.actualizarPaginaActual(this.idUsuario,this.isbn,nuevaPag).then(()=>{
      this.toast.GenerarToast(`Pagina actualizada a ${nuevaPag}`,2000,'bottom')
    }).catch(error => {
      console.error('Error al actualizar la página actual:', error);
    });

  }
  enviarConEnter(event: any) {
    if (event.key === 'Enter') {
      this.bd.actualizarPaginaActual(this.idUsuario, this.isbn, this.paginaActual).then(() => {
        this.toast.GenerarToast(`Página actualizada a ${this.paginaActual}`, 3000, 'bottom');
      }).catch(error => {
        console.error('Error al actualizar la página con Enter:', error);
        this.toast.GenerarToast('Error al actualizar la página', 3000, 'bottom');
      });
    }
  }

  

  favorito(){
    const nuevoEstadoFavorito = !this.libro.es_favorito;

  // Actualizar en la base de datos
  this.bd.actualizarFavorito(this.idUsuario, this.isbn, nuevoEstadoFavorito).then(() => {
    // Actualizar el estado en la interfaz sin necesidad de recargar los detalles del libro
    this.libro.es_favorito = nuevoEstadoFavorito;

    // Mostrar el toast correspondiente
    const mensaje = nuevoEstadoFavorito
      ? 'Se ha añadido el libro a favoritos'
      : 'Se ha eliminado el libro de favoritos';
    this.toast.GenerarToast(mensaje, 3000, 'bottom');
    this.bd.obtenerLibrosPopulares()
  }).catch(error => {
    console.error("Error al actualizar el favorito: ", error);
    this.toast.GenerarToast('Error al actualizar el favorito', 3000, 'bottom');
  });

  }


  eliminarGuardados(){
    const idresena = this.idguardado
    this.bd.elimnarGuardado(idresena).then(()=>{
    this.toast.GenerarToast('Libro Eliminado de Favoritos',2000,'bottom')
    this.cargarDetallesLibro()
    this.router.navigate(['/perfilusuario'])   
    }).catch(e=>{
      console.log('Error al eliminar de guardados'+JSON.stringify(e));
    })
  }


  guardarResena() {
   
      if (this.resena.trim() === '') {
        this.toast.GenerarToast('La reseña no puede estar vacía', 2000, 'bottom');
        return;
      }
  
      const fechaResena = new Date().toISOString();
  
      // Guardar la reseña en la base de datos
      this.bd.enviarResena(this.idUsuario, this.isbn, this.resena, fechaResena).then(() => {
        this.toast.GenerarToast('Reseña guardada correctamente', 2000, 'bottom');
        this.resena = '';
      }).catch(error => {
        console.error('Error al guardar la reseña:', error);
        this.toast.GenerarToast('Error al guardar la reseña', 3000, 'bottom');
      });
  }
}