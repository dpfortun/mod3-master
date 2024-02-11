import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class ServicioestudianteService {
  #http = inject(HttpClient);
  private apiURL = "http://localhost:3000/estudiantes";
  constructor() { }
  getEstudiantes():Observable<IEstudiante[]>{
    return this.#http.get<IEstudiante[]>(`${this.apiURL}`);
  }
  getEstudiantePorId(id:number):Observable<IEstudiante> {
    return this.#http.get<IEstudiante>(`${this.apiURL}/${id}`)
  }
  agregarEstudiante(nuevoEstudiante:IEstudiante) : Observable<IEstudiante>{
    return this.#http.post<IEstudiante>(`${this.apiURL}`, nuevoEstudiante);
  }
  actualizarEstudiante(id: number, estudianteActualizado: IEstudiante): Observable<IEstudiante>{
    return this.#http.put<IEstudiante>(`${this.apiURL}/${id}`, estudianteActualizado );
  }
  eliminarEstudiante(id: number): Observable<IEstudiante>{
    return this.#http.delete<IEstudiante>(`${this.apiURL}/${id}`);
  }
}
