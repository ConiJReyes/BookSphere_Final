import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = 'https://api-libros-dhcv.onrender.com'; // La URL base de tu API

  constructor(private http: HttpClient) {}

  // Obtener todos los libros
  buscarLibros(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`) // Ruta para obtener todos los libros
      .pipe(
        map((response: any) => {
          return response.libros.map((libro: any) => {
            return {
              id: libro.id,
              titulo: libro.titulo,
              autor: libro.autor,
              portada: libro.portada,
              fecha_estreno: libro.fecha_estreno || 'Fecha desconocida'
            };
          });
        })
      );
  }

  // Obtener libro por ID
  buscarLibroPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`) // Ruta para obtener libro por ID
      .pipe(
        map((response: any) => {
          return {
            id: response.libroABuscar.id,
            titulo: response.libroABuscar.titulo,
            autor: response.libroABuscar.autor,
            portada: response.libroABuscar.portada,
            fecha_estreno: response.libroABuscar.fecha_estreno || 'Fecha desconocida'
          };
        })
      );
  }
}
