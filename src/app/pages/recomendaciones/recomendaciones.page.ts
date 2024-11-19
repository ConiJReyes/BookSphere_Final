import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController} from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-recomendaciones',
  templateUrl: './recomendaciones.page.html',
  styleUrls: ['./recomendaciones.page.scss'],
})
export class RecomendacionesPage implements OnInit {
//variables
Titulo_recomendacion:string=""
recomendacion: string =""
idusuario!: number

  constructor(private router:Router ,private menuController: MenuController,private toast : ToastsService, private bd : DBserviceService, private storage : NativeStorage, private alerta : AlertsService) {

    this.menuController.enable(true, 'MenuPrincipal')
    this.menuController.enable(false, 'MenuAdministrador')

    this.obtenerUsuarioLogueado().then(usuario=>{
      if(usuario){
        this.idusuario = usuario
      }
    })

   }
 
  
  EnviarRecomendacion(){
    if(!this.recomendacion){
      this.toast.GenerarToast('Ingrese una recomendacion para continuar',3000,"bottom")
    }else{
      this.bd.insertarRecomendacion(this.Titulo_recomendacion,this.recomendacion, this.idusuario )
      this.toast.GenerarToast('Enviado con exito',3000,"bottom")
      this.router.navigate(['/acercade'])
    }
  }

  async obtenerUsuarioLogueado(): Promise<number | null> {
    try {
      const idUsuario = await this.storage.getItem('usuario_iniciado');
      return idUsuario
    } catch (error) {
      this.alerta.GenerarAlerta('Error', 'Error obteniendo el usuario: ' + JSON.stringify(error));
      return null
    }
  }

  ngOnInit() {
  }

}
