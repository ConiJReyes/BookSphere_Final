import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Categorias } from 'src/app/modules/categorias';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-gestion-categorias-admin',
  templateUrl: './gestion-categorias-admin.page.html',
  styleUrls: ['./gestion-categorias-admin.page.scss'],
})
export class GestionCategoriasAdminPage implements OnInit {
  nuevaCategoria: string = '';
  categorias: Categorias[] = [];

  constructor(
    private bd : DBserviceService,
    private menuController: MenuController,
    private toast: ToastsService
  ) {
    this.menuController.enable(true, 'MenuAdministrador');
    this.menuController.enable(false, 'MenuPrincipal');
  }

  ngOnInit() {
   this.bd.selectCategorias()
   this.bd.dbEstado().subscribe(res=>{
    if(res){
      this.bd.fetchCategoria().subscribe(data=> {
        this.categorias = data
      })
    }
   })
  }


  anadirCategoria(){
    this.bd.insertarCategoria(this.nuevaCategoria).then(()=>{
      this.toast.GenerarToast('Categoria añadida con exito',2000,'bottom')
      this.nuevaCategoria = ""
      this.bd.selectCategorias()
      this.bd.fetchCategoria().subscribe(data=>{
        this.categorias = data
      })
    })
  }

  eliminarCategoria(id: number){
    this.bd.hayLibrosPorCategoria(id).then(res=>{
      if(!res){
        this.bd.eliminarCategoria(id).then(()=>{
          this.toast.GenerarToast('Eliminado correctamente',2000,'bottom')
          this.bd.selectCategorias();
        })
      }else{
        this.toast.GenerarToast('No se puede eliminar una categoria con libros asignados',2000,'bottom')
      }
    })
  }


  

}
