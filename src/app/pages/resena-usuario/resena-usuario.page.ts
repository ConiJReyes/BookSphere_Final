import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-resena-usuario',
  templateUrl: './resena-usuario.page.html',
  styleUrls: ['./resena-usuario.page.scss'],
})
export class ResenaUsuarioPage implements OnInit {
  pestana : boolean = false
  resena: any
  idusuario! : number

  constructor(private route : ActivatedRoute, private bd : DBserviceService, private menu: MenuController, private router: Router, private toast : ToastsService, private storage : NativeStorage) { 

    this.menu.enable(true, 'MenuPrincipal');
    this.menu.enable(false, 'MenuAdministrador');

    this.route.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation()?.extras.state){
        this.resena = router.getCurrentNavigation()?.extras?.state?.['resena']
      }
    })
  }

  ngOnInit() {
    this.obtenerUsuarioLogueado().then(usuario=>{
      if(usuario){
        this.idusuario = usuario
      }
    })
  }

  async obtenerUsuarioLogueado(): Promise<number | null> {
    try {
      const idUsuario = await this.storage.getItem('usuario_iniciado');
      return idUsuario
    } catch (error) {
      console.log('Error al sacar usuario logueado');
      return null
    }
  }

  eliminar(id: number){
    this.bd.eliminarResena(id).then(()=>{
      this.bd.selecResenasUsuario(this.idusuario).then(()=>{
        this.router.navigate(['/perfilusuario'])
      })
    })
    
  }

  modificar(id: number){
    const resenaTexto = this.resena.texto_resena
    this.bd.actualizarResenaUsuario(id,resenaTexto).then(()=>{
      this.toast.GenerarToast('Libro Actualizado correctamnete', 2000,'bottom')
      this.pestana = false
    })
  }

  abrirPestanaModificar(){
    this.pestana = true
  }

  cancelarModificacion(){
    this.pestana = false
  }

}
