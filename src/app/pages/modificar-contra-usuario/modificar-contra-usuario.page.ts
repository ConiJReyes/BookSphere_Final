import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { MenuController} from '@ionic/angular';
import { DBserviceService } from 'src/app/services/dbservice.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ValidationsService } from 'src/app/services/validations.service';

@Component({
  selector: 'app-modificar-contra-usuario',
  templateUrl: './modificar-contra-usuario.page.html',
  styleUrls: ['./modificar-contra-usuario.page.scss'],
})
export class ModificarContraUsuarioPage implements OnInit {

  contraAntigua: string =""
  contraNueva: string=""
  contraRepNueva: string=""

  contraAntiguaValidada : boolean = false
  contraValida : boolean = false
  contraIgual : boolean = false
  contraDebeSerDiferenteAnterior: boolean = false


  mostrarContraAntigua :boolean = false;
  mostrarNueva :boolean = false;
  mostrarNuevaRep :boolean = false;

  idUsuario!: number

  usuario: any

  constructor(private menu: MenuController, private toast : ToastsService, private validation: ValidationsService, private storage : NativeStorage, private activatedrouter: ActivatedRoute, private router : Router, private bd: DBserviceService) {

    this.menu.enable(true,"MenuPrincipal");
    this.menu.enable(false, "MenuAdministrador");

    this.activatedrouter.queryParams.subscribe((param)=>{
      if (this.router.getCurrentNavigation()?.extras.state){
       this.idUsuario = this.router.getCurrentNavigation()?.extras?.state?.['usuarioSeleccionado'] 

      }
    })
   }

  ngOnInit() {
    if (this.idUsuario) {
      this.bd.traerUsuarioLogueado(this.idUsuario)
      this.bd.fetchUsuarioPerfil().subscribe(data=>{
        if(data){
          this.usuario = data     
        }
      })
    }
  }

  togglemostrarContraAntigua() {
    this.mostrarContraAntigua = !this.mostrarContraAntigua;
  }

  togglemostrarNueva() {
    this.mostrarNueva = !this.mostrarNueva;
  }

  togglemostrarmostrarNuevaRep() {
    this.mostrarNuevaRep = !this.mostrarNuevaRep;
  }

  cambiarContra(){
  
    const contraAntiguaLimpia = this.contraAntigua.trim()
    const contraNuevaLimpia = this.contraNueva.trim()
    const contraRepNuevaLimpia = this.contraRepNueva.trim() 

    if(!contraAntiguaLimpia || !contraNuevaLimpia || !contraRepNuevaLimpia){
      this.toast.GenerarToast('Debe ingresar todo los campos',2000,'bottom')
      return
    }

    this.contraValida = false
    this.contraIgual = false
    this.contraAntiguaValidada = false
    this.contraDebeSerDiferenteAnterior = false


    if(!this.validation.validarContrasena(contraNuevaLimpia)||!this.validation.validarContrasena(contraRepNuevaLimpia)){
      this.contraValida = true
    }

    if(contraNuevaLimpia !== contraRepNuevaLimpia){
      this.contraIgual = true
    }

    this.validarContraAntigua(contraAntiguaLimpia).then(datoValido => {
      this.contraAntiguaValidada = !datoValido;
  
      // Si la contraseña antigua es válida, verificar que la nueva contraseña sea diferente de la antigua
      if (datoValido) {
        this.validarContraAntigua(contraNuevaLimpia).then(esIgual => {
          this.contraDebeSerDiferenteAnterior = esIgual;
  
          // Evaluar todas las condiciones de error
          if (this.contraIgual || this.contraValida || this.contraAntiguaValidada || this.contraDebeSerDiferenteAnterior) {
            return;
          }
  
         this.modificarContra(contraNuevaLimpia)
        });
      }
    });
  }


  modificarContra(contraNueva: string){
    this.bd.modifcarContrasena(contraNueva, this.idUsuario).then(()=>{
      this.toast.GenerarToast('Contraseña Cambiada Con exito',2000,'bottom')
      this.bd.traerUsuarioLogueado(this.idUsuario)
      this.router.navigate(['/perfilusuario'])
    })
  }

  validarContraAntigua(contra: string): Promise<boolean>{
    return this.bd.revisarIgualdadDeContraAnterior(this.idUsuario,contra)
  }


}
