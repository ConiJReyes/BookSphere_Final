import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { EmailService } from 'src/app/services/email.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {

  correo : string = "";


  constructor(private alerta: AlertsService,private router : Router, private menuController: MenuController , private bd :DBserviceService, private storage: NativeStorage, private toast : ToastsService, private email : EmailService) { 
    
    this.menuController.enable(false, 'MenuPrincipal')
    this.menuController.enable(false, 'MenuAdministrador')

  }


  ngOnInit() {
  }


  validarCorreo(correo : string){
    const patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(correo)
  }

  irCambiarContra(){

    const correlimpio = this.correo.trim()

    if(!correlimpio){
      this.alerta.GenerarAlerta('Error','Debe Ingresar un correo')
    }else if(!this.validarCorreo(correlimpio)){
      this.alerta.GenerarAlerta('Error','Debe Ingresar un correo valido')
    }else{
      this.bd.revisarCorreoExistente(correlimpio).then((res)=>{
        if(res?.correo_user){
          this.enviarInfo(res)
        }else{
          this.toast.GenerarToast('Ese no es su correo, por favor ingrese un correo valido o cree una cuenta',2000,'bottom')
        }
      })
    }
}


enviarInfo(x:any){
  let navigation : NavigationExtras={
    state:{
      envioId: x
    }
  }
  const correlimpio = this.correo.trim()
  this.email.enviarCodigoDeRep(correlimpio)
  this.router.navigate(['/enviarcodigo'],navigation)
}



}
