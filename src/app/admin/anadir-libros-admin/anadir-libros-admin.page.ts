import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertsService } from 'src/app/services/alerts.service';
import { CameraService } from 'src/app/services/camera.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-anadir-libros-admin',
  templateUrl: './anadir-libros-admin.page.html',
  styleUrls: ['./anadir-libros-admin.page.scss'],
})
export class AnadirLibrosAdminPage implements OnInit {
  // Variables
  isbnLibAnadir: string = '';
  nomLibAnadir: string = '';
  autorLibAnadir: string = '';
  categoriaLibAnadir!: number;
  paginasLibAnadir!: number;
  sinopsisLibAnadir: string = '';
  urlImagen: string = '';
  listadoCategorias: any[] = []; 

  constructor(
    private menuController: MenuController,
    private router: Router,
    private toast: ToastsService,
    private camera: CameraService,
    private alerta: AlertsService,
    private bd: DBserviceService
  ) {
    // Configuraciones Menu
    this.menuController.enable(true, 'MenuAdministrador');
    this.menuController.enable(false, 'MenuPrincipal');
  }

  async ingresarImagen() {
    try {
      const resultado = await this.camera.tomarFoto();
      if (resultado) {
        this.urlImagen = resultado;
        this.toast.GenerarToast('Imagen añadida correctamente', 2000, 'bottom');
      } else {
        this.toast.GenerarToast('No se pudo obtener la imagen.', 2000, 'bottom');
      }
    } catch (error) {
      if (error === 'User cancelled photos app') {
        return;
      } else {
        this.alerta.GenerarAlerta('Error', 'Error con ingresar Imagen' + error);
      }
    }
  }

  // Función para validar campos antes de añadir el libro
  validacionAnadirLibro() {
    if (
      !this.isbnLibAnadir ||
      !this.nomLibAnadir ||
      !this.autorLibAnadir ||
      !this.categoriaLibAnadir ||
      !this.paginasLibAnadir ||
      !this.sinopsisLibAnadir ||
      !this.urlImagen
    ) {
      this.toast.GenerarToast('Ingrese todos los campos para agregar el libro', 2000, 'bottom');
      return;
    }

    // Validar que paginasLibAnadir es un entero
    if (!Number.isInteger(this.paginasLibAnadir)) {
      this.toast.GenerarToast('La cantidad de páginas debe ser un número entero', 3000, 'bottom');
      return;
    }

    // Insertar libro en la base de datos
    this.bd.insertarLibros(
      this.isbnLibAnadir,
      this.nomLibAnadir,
      this.autorLibAnadir,
      this.categoriaLibAnadir,
      this.paginasLibAnadir,
      this.sinopsisLibAnadir,
      this.urlImagen
    );

    // Limpiar campos después de agregar el libro
    this.isbnLibAnadir = '';
    this.nomLibAnadir = '';
    this.autorLibAnadir = '';
    this.categoriaLibAnadir = null!;
    this.paginasLibAnadir = null!;
    this.sinopsisLibAnadir = '';
    this.urlImagen = '';
    this.router.navigate(['/ver-libros-admin']);
  }

  // Validación de entrada para permitir solo números enteros
  validarInputNumerico(event: any) {
    const input = event.target as HTMLInputElement;
    // Reemplazamos cualquier carácter no numérico (como puntos o comas)
    input.value = input.value.replace(/[.,]/g, '');
    // Actualizamos paginasLibAnadir con el número entero
    this.paginasLibAnadir = parseInt(input.value, 10) || 0;
  }
  
  prevenirCaracteresNoNumericos(event: KeyboardEvent) {
    // Impedimos la entrada de '.' y ',' directamente en el input
    if (event.key === '.' || event.key === ',') {
      event.preventDefault();
    }
  }
  
  traerCategoria(){
    this.bd.selectCategorias()
    this.bd.fetchCategoria().subscribe(data=>{
      if(data){
        this.listadoCategorias = data
      }
    })
  }

  ngOnInit() {
    this.traerCategoria()
  }
}
