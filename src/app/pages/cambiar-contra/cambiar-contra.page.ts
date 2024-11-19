import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-cambiar-contra',
  templateUrl: './cambiar-contra.page.html',
  styleUrls: ['./cambiar-contra.page.scss'],
})
export class CambiarContraPage implements OnInit {
  //variables
  contra : string="";
  repetircontra : string ="";

  mostrarContra: boolean = false;
  mostrarRepetirContra: boolean = false;

  contraIgual: boolean = false
  contraAntiguaIgual : boolean = false
  contraValidacion : boolean = false

  idusuario! : number

  constructor(private router: Router, private menuController: MenuController,private toast : ToastsService, private bd : DBserviceService, private alerta : AlertsService, private route: ActivatedRoute, private validation : ValidationsService) {
    this.menuController.enable(false, 'MenuPrincipal')
    this.menuController.enable(false, 'MenuAdministrador')

    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idusuario = this.router.getCurrentNavigation()?.extras.state?.['IdUser']
      }
    })

  }

  toggleMostrarContra() {
    this.mostrarContra = !this.mostrarContra;
  }

  toggleMostrarRepetirContra() {
    this.mostrarRepetirContra = !this.mostrarRepetirContra;
  }
  


  CambiarContra() {

    const contraLimpia = this.contra.trim()
    const contraRepLimpia = this.repetircontra.trim()

    if(!contraLimpia || !contraRepLimpia){
      this.toast.GenerarToast('Debe ingresar todo los campos',2000,'bottom')
      return
    }

    this.contraIgual = false
    this.contraAntiguaIgual = false
    this.contraValidacion = false

    if(!this.validation.validarContrasena(contraLimpia)||!this.validation.validarContrasena(contraRepLimpia)){
      this.contraValidacion = true
    }

    if(contraLimpia !== contraRepLimpia){
      this.contraIgual = true
    }

    this.validarContraAntigua(contraLimpia).then(esIgual=>{
      this.contraAntiguaIgual = esIgual
      
      if(this.contraValidacion|| this.contraIgual|| this.contraAntiguaIgual){
        return
      }
      this.modificarContra(contraLimpia);
    })
  }

  modificarContra(contraNueva: string){
    this.bd.modifcarContrasena(contraNueva, this.idusuario).then(()=>{
      this.toast.GenerarToast('Contraseña cambiada con exito',2000,'bottom')
      this.bd.traerUsuarioLogueado(this.idusuario)
      this.router.navigate(['/login'])
    })
  }

  ngOnInit() {
  }

  validarContraAntigua(contra: string): Promise<boolean>{
    return this.bd.revisarIgualdadDeContraAnterior(this.idusuario,contra)
  }

  
}
