import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { LibrosGuardados } from 'src/app/modules/libros-guardados';
import { ResenasBan } from 'src/app/modules/resenas-ban';
import { ResenasUsuario } from 'src/app/modules/resenas-usuario';
import { AlertsService } from 'src/app/services/alerts.service';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
})
export class PerfilusuarioPage implements OnInit {

  librosGuardados: LibrosGuardados[] = []
  usuarioPerfil: any = {
    username: '',
    correo_user: '',
    foto_perfil: ''
  };
  idusuario!: number

  listaResenas: ResenasUsuario[] = []
  listadoBanResenas: ResenasBan[] = []

  selectedSegment: string = 'libros';



  constructor(private menuController: MenuController, private router: Router, private storage: NativeStorage, private bd: DBserviceService, private toast: ToastsService, private alerta: AlertsService, private cd: ChangeDetectorRef) {

    // CONFIGURACIONES MENU
    this.menuController.enable(true, 'MenuPrincipal');
    this.menuController.enable(false, 'MenuAdministrador');

  }


  ngOnInit() {

    this.obtenerUsuarioLogueado().then(idUsuario => {
      if (idUsuario) {
        this.idusuario = idUsuario

        this.bd.traerUsuarioLogueado(idUsuario);
        this.bd.fetchUsuarioPerfil().subscribe(usuario => {
          this.usuarioPerfil = usuario;
        });

        this.bd.selecResenasUsuario(idUsuario);
        this.bd.fetchResenasUsuario().subscribe(resenas => {
          this.listaResenas = resenas
        })

        this.bd.traerLibrosGuardados(idUsuario);
        this.bd.fetchLibroGuardadoPerfil().subscribe(libros => {
          this.librosGuardados = libros;
        });
        this.cd.detectChanges()
      }
    });
  }


  ionViewWillEnter() {
    this.obtenerUsuarioLogueado().then(idUsuario => {
      if (idUsuario) {
        this.idusuario = idUsuario

        this.bd.traerUsuarioLogueado(idUsuario);
        this.bd.fetchUsuarioPerfil().subscribe(usuario => {
          this.usuarioPerfil = usuario;
        });

        this.bd.selecResenasUsuario(idUsuario);
        this.bd.fetchResenasUsuario().subscribe(resenas => {
          this.listaResenas = resenas
        })

        this.bd.traerLibrosGuardados(idUsuario);
        this.bd.fetchLibroGuardadoPerfil().subscribe(libros => {
          this.librosGuardados = libros;
        });
        this.cd.detectChanges()
      }
    });
  }



  async obtenerUsuarioLogueado(): Promise<number | null> {
    try {
      const idUsuario = await this.storage.getItem('usuario_iniciado');
      return idUsuario
    } catch (error) {
      this.alerta.GenerarAlerta('Error', 'Error obteniendo el usuario: ' + JSON.stringify(error));
      return null
    }
  }

  irCadaResena(x: any){
    let NavigationExtras : NavigationExtras={
      state:{
        resena:x
      }
    }
    this.router.navigate(['/resena-usuario'],NavigationExtras)
  }
  

  irModificarPerfil(idusuario: number) {
    let NavigationExtras: NavigationExtras = {
      state: {
        usuarioSeleccionado: idusuario
      }
    }
    this.router.navigate(['/modificar-perfil-usuario'], NavigationExtras)
  }

  irADetallesLibroGuardado(isbn: string) {
    let NavigationExtras: NavigationExtras = {
      state: {
        isbnEnviar: isbn,
        idusuarioEnviar: this.idusuario
      }
    }
    this.router.navigate(['/libros-guardados-detalles'], NavigationExtras)
  }


  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;
  }

  // resenaFiltradas() {
  //   return this.listaResenas.filter(resena => resena.ISBN !== '0000000000');
  // }
}
