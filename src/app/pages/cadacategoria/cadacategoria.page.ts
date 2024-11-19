import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-cadacategoria',
  templateUrl: './cadacategoria.page.html',
  styleUrls: ['./cadacategoria.page.scss'],
})
export class CadacategoriaPage implements OnInit {

  libros : any[]=[]

  constructor(private route : ActivatedRoute, private bd: DBserviceService, private router: Router, private menu : MenuController) {
    this.menu.enable(true, 'MenuPrincipal')
    this.menu.enable(false, 'MenuAdministrador')
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const idcategoria = params['idcategoria'];
      if (idcategoria) {
        this.bd.seleccionarLibrosPorCategoria(idcategoria, -1).then(libros => {
          this.libros = libros;
        });
      }
    });
  }

  irADetallesLibro(x : any){
    let NavigationExtras : NavigationExtras={
      state:{
        libroSeleccionado: x
      }
    }
    this.router.navigate(['/detalleslibro'],NavigationExtras)
  }

}
