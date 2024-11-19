import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { Libros } from 'src/app/modules/libros';
import { AlertsService } from 'src/app/services/alerts.service';
import { DBserviceService } from 'src/app/services/dbservice.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {

  libros: Libros[] = [];
  librosFiltrados: Libros[] = [];
  librosFavoritos: any[] = [];
  librosPopulares: any[] = [];
 
  categorias: any[] = [];

 
  categoriaFoto : string = 'assets/img/categorias.png'
  currentIndex: number = 0;


  hayBusqueda: boolean = false;

  constructor( private menuController: MenuController, private bd : DBserviceService, private storage: NativeStorage, private alerta : AlertsService, private router : Router){
  /// Menu controller    
    this.menuController.enable(true, 'MenuPrincipal');
    this.menuController.enable(false, 'MenuAdministrador');
    
  
  
  }
   
 
  buscarLibro(event: any) {
    const query = event.target.value?.toLowerCase().trim() || '';
    console.log('Consulta de búsqueda:', query); 

    this.hayBusqueda = query !== '';

    if (this.hayBusqueda) {
      this.librosFiltrados = this.libros.filter(libro =>
        libro.titulo.toLowerCase().includes(query) || 
        libro.ISBN.toLowerCase().includes(query)
      );
      console.log('Resultados encontrados:', this.librosFiltrados);
    } else {
      this.librosFiltrados = [...this.libros];
    }
  }

  irCadaLibro(x : any){
    let NavigationExtras : NavigationExtras={
      state:{
        libroSeleccionado: x
      }
    }
    this.router.navigate(['/detalleslibro'],NavigationExtras)
  }

  irTodosLosLibros(idcategoria: number) {
    this.router.navigate(['/cadacategoria'], { queryParams: { idcategoria } });
  }


  ngOnInit() {

    this.bd.selectCategorias()
    this.bd.fetchCategoria().subscribe(data=>{
      this.categorias = data
    })



    this.bd.obtenerLibrosPopulares()
    this.bd.fetchLibrosPopulares().subscribe(data=>{
      this.librosPopulares = data
    })

    this.bd.seleccionarLibros()
    this.bd.fetchLibros().subscribe((data) => {
      this.libros = data;   
    });
  }
}
