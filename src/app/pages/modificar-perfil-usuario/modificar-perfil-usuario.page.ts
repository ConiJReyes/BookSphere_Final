import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { CameraService } from 'src/app/services/camera.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-modificar-perfil-usuario',
  templateUrl: './modificar-perfil-usuario.page.html',
  styleUrls: ['./modificar-perfil-usuario.page.scss'],
})
export class ModificarPerfilUsuarioPage implements OnInit {
//variables

  idUsuario! : number

  usuario : any = {
    username : '',
    correo: '',
    foto_perfil : ''
  }

  constructor(private toast : ToastsService,private router:Router,private activatedrouter:ActivatedRoute, private menu : MenuController, private bd : DBserviceService, private camera: CameraService, private alerta: AlertsService) { 
    
    this.menu.enable(true,"MenuPrincipal");
    this.menu.enable(false, "MenuAdministrador");

    this.activatedrouter.queryParams.subscribe((param)=>{
      if (this.router.getCurrentNavigation()?.extras.state){
       this.idUsuario = this.router.getCurrentNavigation()?.extras?.state?.['usuarioSeleccionado'] 

      }
    })
   
  }


   async ingresarImagen(){
     try{
      const resultado = await this.camera.tomarFoto();
      if(resultado){
          this.usuario.foto_perfil = resultado
       this.toast.GenerarToast('Imagen añadida correctamente',2000,'bottom')
      }else{
       this.toast.GenerarToast('No se pudo obtener la imagen.',2000,'bottom')
      }
     }catch(error : any){
       if (error === 'User cancelled photos app'|| error.message === 'User cancelled photos app'){
         return
       }else{
         this.alerta.GenerarAlerta('Error','Error con ingresar Imagen'+ error) 
       }
      
     }
   }




ModificarPerfil(){
  //Si hay algun campo vacio pide que se llenen todos o no saldran otras alertas

  const usuarioLimpio = this.usuario.username.trim()

  if (!usuarioLimpio) {
    this.toast.GenerarToast('Debe ingresar campos',5000,"bottom")
    return;
  }
    this.bd.modificarPerfilUsuario(this.idUsuario,usuarioLimpio,this.usuario.foto_perfil).then(()=>{
      this.bd.traerUsuarioLogueado(this.idUsuario); // Emitir el cambio
      this.router.navigate(['/perfilusuario']);
    })
    
  }


  ngOnInit() {
    
    if (this.idUsuario) {
      this.bd.traerUsuarioLogueado(this.idUsuario)
      this.bd.fetchUsuarioPerfil().subscribe(data=>{
        if(data){
          this.usuario = data     
        }
      })
    }
  }

  irModificarContra(){
    let NavigationExtras: NavigationExtras = {
      state: {
        usuarioSeleccionado: this.idUsuario
      }
    }
    this.router.navigate(['/modificar-contra-usuario'], NavigationExtras)
  }

}
