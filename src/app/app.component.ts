import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { AlertsService } from './services/alerts.service';
import { DBserviceService } from './services/dbservice.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  esAdmin: boolean = false

  constructor(private storage: NativeStorage, private route : Router, private menu: MenuController, private alerta : AlertsService, private bd : DBserviceService) {
  }
  cerrarSesion(){
    this.storage.remove('alertaBaneoMostrada')
    this.storage.remove('usuario_iniciado').then(()=>{
      this.route.navigate(['/login']).then(()=>{
        this.menu.close();
        this.alerta.GenerarAlerta('Info','Sesión cerrada correctamente')
      })
    }).catch(error => {
      this.alerta.GenerarAlerta('Error', 'Error al cerrar sesión: ' + JSON.stringify(error));
    });   
  }


//esto fue un error q tuvimos, me dio peresa quitarlo y poner un routerlink en el sidemenu pero no escribir esto
  irPerfilUsuario(){
    this.route.navigate(['/perfilusuario']);
  }
}
