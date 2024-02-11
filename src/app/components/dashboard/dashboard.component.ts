import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ServicioestudianteService } from '../../core/servicioestudiante.service';
import { IEstudiante } from '../../models/estudiante';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component';
import { CommonModule } from '@angular/common';
/* export interface Estudiante {
  nombre: string;
  apellido: string;
  edad: number;
  carrera: string
}

const estudiantes: Estudiante[] = [
  {nombre: "Paola", apellido: "Lopez", edad: 23, carrera: "Ing. de Sistemas"},
  {nombre: "Paola", apellido: "Lopez", edad: 23, carrera: "Ing. de Sistemas"},
  {nombre: "Paola", apellido: "Lopez", edad: 23, carrera: "Ing. de Sistemas"},
  {nombre: "Paola", apellido: "Lopez", edad: 23, carrera: "Ing. de Sistemas"},
  {nombre: "Paola", apellido: "Lopez", edad: 23, carrera: "Ing. de Sistemas"},
  {nombre: "Paola", apellido: "Lopez", edad: 23, carrera: "Ing. de Sistemas"}
]; */

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,
            MatTableModule,
            MatIconModule,
            MatButtonModule,
            NuevoUsuarioComponent,
            RouterModule,
            CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  /* lista_estudiantes: IEstudiante[]=[]; */
  lista_estudiantes!: MatTableDataSource<IEstudiante>;
  estudiante!:IEstudiante;
  mostrarFormulario: boolean = false;
  nombres_columnas: string[] = ['id','nombre', 'apellido', 'edad', 'carrera','acciones'];
  constructor(private apiServicio: ServicioestudianteService,
              private router: Router){
    this.lista_estudiantes = new  MatTableDataSource<IEstudiante>;
  }
  ngOnInit(): void {
    this.getEstudiantes();
  }
  //GET A ESTUDIANTES
  getEstudiantes(){
    return this.apiServicio.getEstudiantes().subscribe(
      (data: IEstudiante[]) => {
        this.lista_estudiantes =  new MatTableDataSource(data) ;
      });
  }
  /* lista_estudiantes = estudiantes; */
  //Elimina Estudiante
  borrarEstudiante(id:number,nombre:string, apellido:string):void{
    if (confirm("Esta seguro que deses eliminar al Estudiante: " + nombre +" " + apellido)) {
      this.apiServicio.eliminarEstudiante(id).subscribe(
        (data)=>{
          this.getEstudiantes()
          alert('Se elimini correctamente');
        });
    }
  }
  cargaEstudiante(estudiante: IEstudiante) {
    /* this.estudiante = estudiante; */
    /* estudiante.nombre
    estudiante.apellido
    estudiante.edad
    estudiante.carrera */

    this.router.navigate(['/nuevo'], { state: { data: estudiante } });
    /* this.router.navigateByUrl(`/editarEstudiante/${estudiante.id}/${estudiante.nombre}`); */
    /* console.log(this.estudiante); */
  }
  /* editarEstudiante(id:number):void{
      const ruta = (`/editarEstudiante/${id}/edit`);
      console.log(ruta);
      this.router.navigateByUrl(`/editarEstudiante/${id}/edit`);
  } */
}
