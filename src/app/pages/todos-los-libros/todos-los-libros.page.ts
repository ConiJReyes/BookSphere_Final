import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Libros } from 'src/app/modules/libros';
import { DBserviceService } from 'src/app/services/dbservice.service';


@Component({
  selector: 'app-todos-los-libros',
  templateUrl: './todos-los-libros.page.html',
  styleUrls: ['./todos-los-libros.page.scss'],
})

export class TodosLosLibrosPage implements OnInit {

  libros: any[] = [];

  constructor(private menuController: MenuController, private bd: DBserviceService, private router: Router, private apiService: ApiService) {

    // CONFIGURACIONES MENU
    this.menuController.enable(true, 'MenuPrincipal');
    this.menuController.enable(false, 'MenuAdministrador');
  }


  ngOnInit() {
    this.bd.seleccionarLibros()
    this.bd.dbEstado().subscribe(res=>{
      if(res){
        this.bd.fetchLibros().subscribe(data=>{
          this.libros = data
        })
      }
    })
  }


  
  irCadaLibro(libro: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        libroSeleccionado: libro
      }
    };
    this.router.navigate(['/detalleslibro'], navigationExtras);
  }
  }




