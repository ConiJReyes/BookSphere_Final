import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { MenuController } from '@ionic/angular';
import { Resenas } from 'src/app/modules/resenas';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-gestion-comentario-libro',
  templateUrl: './gestion-comentario-libro.page.html',
  styleUrls: ['./gestion-comentario-libro.page.scss'],
})
export class GestionComentarioLibroPage implements OnInit {

  resenas: Resenas[]=[]

  constructor(private router: Router,private menuController: MenuController, private bd : DBserviceService, private toast : ToastsService) {
        // CONFIGURACIONES MENU
        this.menuController.enable(true, 'MenuAdministrador');
        this.menuController.enable(false, 'MenuPrincipal');
   }

  ngOnInit() {
    this.bd.selectResenas()
    this.bd.dbEstado().subscribe(res=>{
      if(res){
        this.bd.fetchResenas().subscribe(data=>{
          this.resenas = data
        })
      }      
    })
  }

  borrarResena(x : any){
    const resenaId = x.id_resena
    this.bd.eliminarResena(resenaId).then(()=>{
      this.bd.selectResenas()
    })
  }


  banearResena(x : any, idResena : any){
    const nEstadoBan = !x.estadoBan 
    this.bd.actualizarBanResena(nEstadoBan, idResena).then(()=>{
      x.estadoBan = nEstadoBan

      const mensaje = nEstadoBan
      ? 'Se ha baneado la reseña'
      : 'Se ha eliminado el ban a la reseña';
      this.toast.GenerarToast(mensaje,2000,'bottom')
      this.bd.selectResenas()
    }).catch(error => {
      console.error("Error al actualizar el BAN: ", error);
    });
  }

  
}
