import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Recomendaciones } from 'src/app/modules/recomendaciones';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-recomendaciones-admin',
  templateUrl: './recomendaciones-admin.page.html',
  styleUrls: ['./recomendaciones-admin.page.scss'],
})
export class RecomendacionesAdminPage implements OnInit {

  recomendaciones : Recomendaciones[]=[]

  constructor( private menuController : MenuController, private bd : DBserviceService, private toast : ToastsService) {
    this.menuController.enable(true, 'MenuAdministrador');
    this.menuController.enable(false, 'MenuPrincipal');
   }

  ngOnInit() {
    this.bd.selectRecomendaciones()
    this.bd.dbEstado().subscribe(res=>{
      this.bd.fetchRecomendacion().subscribe(data=>{
        this.recomendaciones = data
      })
    })
  
  }


  eliminarRecomendacion(x: any){
    this.bd.eliminarRecomendacion(x.id_recomendacion).then(()=>{
      this.toast.GenerarToast('Recomendacion Eliminada Con Exito',2000,'bottom')
      this.bd.selectRecomendaciones()
    })
  }

}
