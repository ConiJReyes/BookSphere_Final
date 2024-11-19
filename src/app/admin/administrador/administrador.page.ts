import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  

  constructor(private menuController: MenuController , private bd :DBserviceService) {
    
    // CONFIGURACIONES MENU
        this.menuController.enable(true, 'MenuAdministrador');
        this.menuController.enable(false, 'MenuPrincipal');
       }

  ngOnInit() {
    this.bd.seleccionarLibros()

  }
  
  }

  
