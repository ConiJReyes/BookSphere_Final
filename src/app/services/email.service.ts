import { Injectable } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ToastsService } from './toasts.service';
import { AlertsService } from './alerts.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  codigo: string = ""

  constructor(private toast : ToastsService, private alerta: AlertsService) { }


  numeroAleatorioDe6Digitos(){
    return Math.floor(100000 + Math.random() * 900000).toString();
  }


  async enviarCodigoDeRep(email:string){
    const codigo = this.numeroAleatorioDe6Digitos()
    this.codigo = codigo
    const templateParams = {
      to_email: email,
      codigo_recuperacion: codigo, // Este es el código generado
    };
    
   await emailjs.send("service_soludyg","template_565ma58", templateParams,{publicKey:'8j4_wiJQO-qkKkREH'}).then(res=>{
      this.toast.GenerarToast('Se a enviado con exito el Correo',2000,'bottom')
    }).catch(e=>{
      this.alerta.GenerarAlerta('Error','Hubo un error enviando el correo')
    })
   
  }

  validarCodigo(codigoIngresado: string): boolean{
    return this.codigo === codigoIngresado
  }

  vaciarCodigo(){
    this.codigo = ""
  }
}
