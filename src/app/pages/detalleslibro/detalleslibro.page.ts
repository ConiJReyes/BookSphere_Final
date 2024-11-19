import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Resenas } from 'src/app/modules/resenas';

@Component({
  selector: 'app-detalleslibro',
  templateUrl: './detalleslibro.page.html',
  styleUrls: ['./detalleslibro.page.scss'],
})
export class DetalleslibroPage implements OnInit {

  libro: any;
  resenas: Resenas[] = [];  // Nueva propiedad para las reseñas del libro actual

  constructor(
    private menuController: MenuController,
    private toast: ToastsService,
    private activatedRouter: ActivatedRoute,
    private route: Router,
    private storage: NativeStorage,
    private bd: DBserviceService
  ) {
    this.activatedRouter.queryParams.subscribe(params => {
      if (this.route.getCurrentNavigation()?.extras.state) {
        this.libro = this.route.getCurrentNavigation()?.extras.state?.['libroSeleccionado'];
      }
    });

    this.menuController.enable(true, 'MenuPrincipal');
    this.menuController.enable(false, 'MenuAdministrador');
  }

  async anadirGuardados() {
    await this.storage.getItem('usuario_iniciado').then(async id => {
      const libroGuardado = await this.bd.verificarLibroGuardado(id, this.libro.ISBN);
      if (libroGuardado) {
        this.toast.GenerarToast('El libro ya ha sido añadido a favoritos', 3000, 'bottom');
      } else {
        this.bd.guardarLibrosPerfil(id, this.libro.ISBN).then(() => {
          this.toast.GenerarToast('Libro guardado con éxito en el Perfil', 3000, 'bottom');
          this.route.navigate(['/feed']);
        });
      }
    }).catch(e => {
      console.error("Error al añadir el libro a guardados:", e);
    });
  }

  ngOnInit() {
    this.cargarResenasPorISBN(this.libro.ISBN);
  }

  // Nuevo método para cargar las reseñas del libro actual por ISBN
  cargarResenasPorISBN(isbn: string) {
    this.bd.obtenerResenasPorISBN(isbn).then(resenas => {
      this.resenas = resenas;
    }).catch(e => {
      console.error("Error al cargar las reseñas del libro:", e);
    });
  }
}
