import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {

  constructor(private menuController: MenuController, private storage : NativeStorage, private alerta : AlertsService, private route :Router) {
    
    // CONFIGURACIONES MENU
        this.menuController.enable(true, 'MenuPrincipal');
        this.menuController.enable(false, 'MenuAdministrador');
       }

  ngOnInit() {
  }

  async mostrarNotifications(evento: any) {
    try {
      if (evento.detail.checked) {
        // Solicitar permisos de notificaciones
        const permiso = await LocalNotifications.requestPermissions();
        if (permiso.display === 'granted') {
          // Enviar notificación inmediata
          await LocalNotifications.schedule({
            notifications: [
              {
                title: "¡Es hora de leer!",
                body: "No olvides actualizar tu progreso de lectura.",
                id: 1,
                schedule: { 
                  at: new Date(Date.now() + 1000) 
                },
              }
            ]
          });
          console.log("Notificación enviada inmediatamente");
        } else {
          console.log("Permiso denegado para notificaciones");
        }
      } else {
        // Cancelar notificaciones si desactiva el toggle
        await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
        console.log("Notificaciones desactivadas");
      }
    } catch (error) {
      console.error("Error en la gestión de notificaciones:", error);
    }
  }
  
  cerrarSesion(){
    this.storage.remove('usuario_iniciado').then(()=>{
      this.route.navigate(['/login']).then(()=>{
        this.menuController.close();
        this.alerta.GenerarAlerta('Info','Sesión cerrada correctamente')
      })
    }).catch(error => {
      this.alerta.GenerarAlerta('Error', 'Error al cerrar sesión: ' + JSON.stringify(error));
    });
    
  }
}