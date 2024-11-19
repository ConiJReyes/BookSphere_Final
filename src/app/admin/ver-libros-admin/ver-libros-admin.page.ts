import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Libros } from 'src/app/modules/libros';
import { AlertsService } from 'src/app/services/alerts.service';
import { CameraService } from 'src/app/services/camera.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-ver-libros-admin',
  templateUrl: './ver-libros-admin.page.html',
  styleUrls: ['./ver-libros-admin.page.scss'],
})
export class VerLibrosAdminPage implements OnInit {

  arregloLibros: Libros[]= []
  libroSeleccionado : any
  estadoSelec: string = ''
  listadoCategorias: any

  libroTemporal : any = {}

  pestanaModificarLibro : boolean = false
  pestanaEliminarLibro : boolean = false

  constructor(private menuController: MenuController, private bd : DBserviceService,private toast :ToastsService, private camera: CameraService, private alerta : AlertsService) {
    
    // CONFIGURACIONES MENU
        this.menuController.enable(true, 'MenuAdministrador');
        this.menuController.enable(false, 'MenuPrincipal');
       }

  ngOnInit() {
    this.traerCategoria();
    this.bd.seleccionarLibros();
    this.bd.dbEstado().subscribe(res=>{
      if(res){
        this.bd.fetchLibros().subscribe(data=>{
          this.arregloLibros = data;  
        })
      }
    })
  }

  validarInputNumerico(event: any) {
  const input = event.target as HTMLInputElement;
  // Reemplazamos cualquier carácter no numérico
  input.value = input.value.replace(/[.,]/g, '');
  // Actualizamos el valor de libroTemporal.cantidad_paginas con el número entero
  this.libroTemporal.cantidad_paginas = parseInt(input.value, 10) || 0;
}

prevenirCaracteresNoNumericos(event: KeyboardEvent) {
  // Impedimos la entrada si es un punto o coma
  if (event.key === '.' || event.key === ',') {
    event.preventDefault();
  }
}

  
  

  editarLibro(){
    if(this.libroTemporal){
      const isbn = this.libroTemporal.ISBN
      const titulo = this.libroTemporal.titulo
      const autor = this.libroTemporal.autor
      const cantidad_paginas = this.libroTemporal.cantidad_paginas
      const sinopsis = this.libroTemporal.sinopsis
      const portada = this.libroTemporal.portada
      const id_categoria = this.libroTemporal.id_categoria

      this.bd.editarLibros(isbn,titulo,autor,id_categoria,cantidad_paginas,sinopsis,portada)
      this.toast.GenerarToast('Libro actualizado con exito',3000,'bottom')
      this.cancelarEditar()
    }
  }
  

  eliminarLibro(){
    if(this.libroSeleccionado){
      const isbn = this.libroSeleccionado.ISBN
      this.bd.eliminarLibros(isbn);
      this.cancelarBorrar();
    }
  }

  
  abrirPestanaBorrar(libro: any){
    this.pestanaEliminarLibro = true
    this.libroSeleccionado = libro
  }

  abrirPestanaEditar(libro :any){
    this.pestanaModificarLibro = true
    this.libroTemporal = {...libro}
  }

  cancelarBorrar(){
    this.pestanaEliminarLibro = false
  }
  cancelarEditar(){
    this.pestanaModificarLibro = false
    this.libroTemporal = {}
  }

  async ingresarImagen(){
    try{
     const resultado = await this.camera.tomarFoto();
     if(resultado){
      this.libroTemporal.portada = resultado
      this.toast.GenerarToast('Imagen añadida correctamente',2000,'bottom')
     }else{
      this.toast.GenerarToast('No se pudo obtener la imagen.',2000,'bottom')
     }
    }catch(error : any){
      if (error === 'User cancelled photos app'|| error.message === 'User cancelled photos app'){
        return
      }else{
        this.alerta.GenerarAlerta('Error','Error con ingresar Imagen'+ error) 
      }
      
    }
  }


  traerCategoria(){
    this.bd.selectCategorias()
    this.bd.fetchCategoria().subscribe(data=>{
      if(data){
        this.listadoCategorias = data
      }
    })
  }

  validarEdicionLibros() {
    if (!this.libroTemporal.ISBN||!this.libroTemporal.titulo||!this.libroTemporal.autor||!this.libroTemporal.id_categoria||!this.libroTemporal.cantidad_paginas||!this.libroTemporal.sinopsis||!this.libroTemporal.portada) {
      this.toast.GenerarToast('No puede haber ningún campo vacío',4500,"bottom");
    } else {
      this.editarLibro()
    }
  }

}
