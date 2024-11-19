import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { EmailService } from 'src/app/services/email.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-enviarcodigo',
  templateUrl: './enviarcodigo.page.html',
  styleUrls: ['./enviarcodigo.page.scss'],
})
export class EnviarcodigoPage implements OnInit {

  codigo: string = ""
  usuario: any


  constructor(private email : EmailService, private toast : ToastsService, private alerta: AlertsService, private activatedroute: ActivatedRoute, private router: Router, private menuController: MenuController) { 
    this.menuController.enable(false, 'MenuPrincipal')
    this.menuController.enable(false, 'MenuAdministrador')

    this.activatedroute.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuario = this.router.getCurrentNavigation()?.extras.state?.['envioId']
      }
    })

  }

  ngOnInit() {
  }


  enviarCodigo(codigo: string){
    if(!this.email.validarCodigo(codigo)){
      this.alerta.GenerarAlerta('Error','Los codigos no son iguales')
      return
    }
    this.toast.GenerarToast('El codigo coincide',2000,'bottom')
    this.irCambioDeContra();
  } 

  irCambioDeContra(){
    const idUsuario = this.usuario.id_usuario
    let NavigationExtras: NavigationExtras={
      state:{
        IdUser: idUsuario
      }
    }
    this.router.navigate(['/cambiar-contra'],NavigationExtras)
  }

}
