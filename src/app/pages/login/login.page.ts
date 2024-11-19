import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { DBserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  onValidate() {
    throw new Error('Method not implemented.');
  }

  usuario: string = '';
  password: string = '';

  mostrarContra :boolean = false;



  constructor(
    private router: Router,
    private alerta : AlertsService,
    private menuControlelr: MenuController,
    private bd : DBserviceService,
    private storage : NativeStorage
  ) {
    //Eliminar los menus de esta pagina

    this.menuControlelr.enable(false, 'MenuPrincipal');
    this.menuControlelr.enable(false, 'MenuAdministrador');

  }

  //Funcion para iniciar sesion, tiene condiciones para evitar que no se ingresen datos, que los datos sean incorrectos
  //o para entrar como administrador


  inicioSesion() {
    const usuarioSinEspacios = this.usuario.trim();
    const passwordSinEspacios = this.password.trim()

    if (!usuarioSinEspacios || !passwordSinEspacios) {
      this.alerta.GenerarAlerta('Error','Debe ingresar datos');
    }else{
      this.bd.inicioSesionUsuario(usuarioSinEspacios, passwordSinEspacios).then(usuario=>{
        if(usuario){

          if(usuario.estadoBanUsuario === 1){
            this.alerta.GenerarAlerta('Ban','Tu cuenta a sido baneada por los moderadores')
            this.usuario = "";
            this.password = "";
            return
          }

          if(usuario.id_rol === 1){
            this.guardarUsuario(usuario.id_usuario)
            this.router.navigate(['/administrador']);
          }else{
            this.guardarUsuario(usuario.id_usuario)
            this.router.navigate(['/feed']);
          }

          this.usuario = "";
          this.password = "";

        }else{
          this.password = "";
          this.alerta.GenerarAlerta('Error', 'Datos Incorrectos o no se a encontrado Usuario')
        }
      }).catch(e => {
        this.alerta.GenerarAlerta('Error', 'Error al iniciar sesión: ' + JSON.stringify(e));
      });
    }
  }

  async guardarUsuario(usuarioID:number){
    try {
      await this.storage.setItem('usuario_iniciado', usuarioID);
    } catch (error) {
      this.alerta.GenerarAlerta('Error', 'Error al guardar el usuario: ' + JSON.stringify(error));
    }
  }

  registrarse() {
    this.usuario = ""
    this.password = ""
    this.router.navigate(['/registrarse'])
  }


  recuperarCuenta() {
    this.router.navigate(['/recuperar-contra'])
  }

  togglemostrarContra() {
    this.mostrarContra = !this.mostrarContra;
  }

  ngOnInit() { }
}
