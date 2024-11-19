import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';


@Component({
  selector: 'app-gestion-usuario-admin',
  templateUrl: './gestion-usuario-admin.page.html',
  styleUrls: ['./gestion-usuario-admin.page.scss'],
})
export class GestionUsuarioAdminPage implements OnInit {

  idUsuarioCambioRol! : number
  idRolActual! : number
  usuarioSeleccionado: any;
  pestanaRolUsuario: boolean = false
  arregloUsuarios : any = [
    {
      id_usuario : '',
      username : '',
      correo_user: '',
      id_rol: '',
      estadoBanUsuario: ''
    }
  ]

  constructor(private menuController:MenuController, private bd : DBserviceService, private toast : ToastsService) { 
    this.menuController.enable(true, 'MenuAdministrador');
    this.menuController.enable(false, 'MenuPrincipal');
    
  }
  
  ngOnInit() {
    this.bd.seleccionarUsuarios();
    this.bd.dbEstado().subscribe(res=>{
      if(res){
        this.bd.fetchUsuario().subscribe(data=>{
          this.arregloUsuarios = data;
        })
      }
    })
  }
 
  toggleUsuario(usuario: any) {

    if(usuario.id_usuario === 1){
      this.toast.GenerarToast('No se puede alterar el Admin principal',2000,'bottom')
      return;
    }

    const nEstadoBanUsuario = !usuario.estadoBanUsuario

    this.bd.actualizarBanUsuario(nEstadoBanUsuario,usuario.id_usuario).then(()=>{
      usuario.estadoBanUsuario = nEstadoBanUsuario

      const mensaje = nEstadoBanUsuario
      ? 'Se ha baneado el usuario'
      : 'Se ha desbaneado el usuario';
      this.toast.GenerarToast(mensaje,2000,'bottom')
      this.bd.seleccionarUsuarios();
    })

  }
  
 
  cambiarRolUsuario(x : any){
    this.idUsuarioCambioRol = x.id_usuario
    this.idRolActual = x.id_rol
    this.pestanaRolUsuario = true
  }

  aceptarCambioRol(){

    if(this.idRolActual === 1){
      this.toast.GenerarToast('No se puede cambiar de Rol el Admin Principal',2000,'bottom')
      this.pestanaRolUsuario = false
      return
    }



    const idRolNuevo = this.idRolActual === 1 ? 2 : 1;
    this.bd.actualizarCambioDeRol(idRolNuevo,this.idUsuarioCambioRol).then(()=>{
      this.toast.GenerarToast( idRolNuevo === 1 ? 'El usuario ahora es Administrador' : 'El usuario ahora es Usuario',2000,'bottom')
    })
    this.pestanaRolUsuario = false
    this.bd.seleccionarUsuarios()
  }


  cancelarCambioRol(){
    this.pestanaRolUsuario = false
  }
}

