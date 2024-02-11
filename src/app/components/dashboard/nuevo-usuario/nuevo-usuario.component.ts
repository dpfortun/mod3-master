import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule,FormGroup, FormControl, Validators } from '@angular/forms';
import { IEstudiante } from '../../../models/estudiante';
import { ServicioestudianteService } from '../../../core/servicioestudiante.service';
import { DashboardComponent } from '../dashboard.component';
import { RouterOutlet,RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [NavbarComponent,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    DashboardComponent,
    RouterOutlet,
    RouterModule,
    CommonModule],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css'
})
export class NuevoUsuarioComponent implements OnInit{
  @Input() data: IEstudiante | null = null;
  nuevoEstudiante!: FormGroup;
  estudiante!: IEstudiante;
  //UN POST
  constructor(private apiServicio: ServicioestudianteService,
              private router: Router){
    this.nuevoEstudiante = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      apellido: new FormControl('',[Validators.required]),
      edad: new FormControl(0,[Validators.required]),
      carrera: new FormControl('')
    });

  }
  ngOnInit(): void {
      console.log('Entra');
      this.estudiante = history.state.data;
      if (this.estudiante) {
        this.nuevoEstudiante.patchValue({
          id:       this.estudiante.id,
          nombre:   this.estudiante.nombre,
          apellido: this.estudiante.apellido,
          edad:     this.estudiante.edad,
          carrera:  this.estudiante.carrera,
        });
      }
    /*  this.route.params.subscribe(params => {
      const id = params['id'];
      this.editar(id);
       }); */
  }

  onSubmit() {
    console.log('Entrando a Submit',this.nuevoEstudiante.valid);
    if (this.nuevoEstudiante.valid) {
      if (this.estudiante) {
        console.log('Entra para modificar');
        this.apiServicio.actualizarEstudiante(this.estudiante.id,this.nuevoEstudiante.value).subscribe(
          (data: IEstudiante)=>{
            alert('Se actualizo el registro');
            this.router.navigateByUrl('/dashboard');
          });
      } else {
        this.apiServicio.agregarEstudiante(this.nuevoEstudiante.value).subscribe(
          (data: IEstudiante)=>{
            alert('Se agrego correctamente');
          this.limpiarFormEstudiante();
        })
      }
    } else {
      this.nuevoEstudiante.markAllAsTouched();
    }
  }
  limpiarFormEstudiante() {
    this.nuevoEstudiante.reset();
  }
}
