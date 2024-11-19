import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {
//variables
  username: string ="";
  password: string ="";
  email: string ="";
  passwordR: string ="";

  correoValido : boolean = false;
  contraValida : boolean = false;
  contraIgual : boolean = false;

  mostrarContra: boolean = false;
  mostrarRepetirContra: boolean = false;

  // el alertcontroller es para las pantallaz de errores emergentes, bueno no necesariamente de errores
  constructor(
    private router: Router,
    private alerta: AlertsService,
    private toast : ToastsService,
    private bd: DBserviceService,
    private menuController: MenuController,
    private validation: ValidationsService) {
      //No mostrar ninguno de los menu en esta pagina
    this.menuController.enable(false, 'MenuPrincipal')
    this.menuController.enable(false, 'MenuAdministrador')
  }

  toggleMostrarContra() {
    this.mostrarContra = !this.mostrarContra;
  }

  toggleMostrarRepetirContra() {
    this.mostrarRepetirContra = !this.mostrarRepetirContra;
  }

  

  ngOnInit() {
  }



  validacionDatosCorreo() {
    const usernameSinEspacios = this.username.trim()
    const passwordSinEspacios = this.password.trim()
    const emailSinEspacios = this.email.trim()
    const passwordRSinEspacios = this.passwordR.trim()
    //Si hay algun campo vacio pide que se llenen todos o no saldran otras alertas
    if (!usernameSinEspacios || !passwordSinEspacios || !emailSinEspacios || !passwordRSinEspacios) {
      this.alerta.GenerarAlerta('ERROR','Todos los campos deben ser ingresados');
      return;
    }

    this.correoValido = false;
    this.contraValida = false;
    this.contraIgual = false;

    // Validar correo
    if (!this.validation.validarCorreo(emailSinEspacios)) {
      this.correoValido = true;
    }

    // Validar formato de la contraseña
    if (!this.validation.validarContrasena(passwordSinEspacios) || !this.validation.validarContrasena(passwordRSinEspacios)) {
      this.contraValida = true;
    }

    // Verificar si las contraseñas coinciden
    if (passwordSinEspacios !== passwordRSinEspacios) {
      this.contraIgual = true;
    }

    // Si alguna validación falló, no continuar con el registro
    if (this.correoValido || this.contraValida || this.contraIgual) {
      return;
    }

      this.Registrarse();
    }
//Permite que los datos del user registrados esten disponibles en el login
Registrarse() {
  const usernameSinEspacios = this.username.trim()
  const emailSinEspacios = this.email.trim()
  const passwordSinEspacios = this.password.trim()
  this.bd.verificarCorreoUsuario(usernameSinEspacios,emailSinEspacios).then(existe=>{
    if(existe){
      this.alerta.GenerarAlerta('Error','El nombre de usuario o correo ya existen')
    }else{
      this.bd.insertarUsuario(usernameSinEspacios,emailSinEspacios,passwordSinEspacios).then(()=>{  

        this.username = "";
        this.email = "";
        this.password = "";
        this.passwordR = "";

        this.toast.GenerarToast('Usuario creado exitosamente',3000,'bottom')
        this.router.navigate(['/login'])
      }).catch(e=>{
        this.alerta.GenerarAlerta('Error','Error al insertar los datos'+ JSON.stringify(e))
      })
    }
  })
}
}