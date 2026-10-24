import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.scss'
})
export class Alumnos implements OnInit {
  private api = inject(ApiService);

  alumnos = signal<Alumno[]>([]);
  cargando = signal(true);
  error = signal('');
  errorEliminar = signal('');
  eliminando = signal<number | null>(null);

  ngOnInit(): void {
    this.api.listarAlumnos().subscribe({
      next: (datos) => {
        this.alumnos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(
          'No se pudieron cargar los alumnos. Revisa el backend.'
        );
        this.cargando.set(false);
      }
    });
  }

  eliminar(alumno: Alumno): void {
    if (this.eliminando() !== null) {
      return;
    }

    if (!confirm(`¿Deseas eliminar a ${alumno.nombres}?`)) {
      return;
    }

    this.errorEliminar.set('');
    this.eliminando.set(alumno.id);

    this.api.eliminarAlumno(alumno.id).subscribe({
      next: () => {
        this.alumnos.update(lista =>
          lista.filter(item => item.id !== alumno.id)
        );
        this.eliminando.set(null);
      },
      error: () => {
        this.errorEliminar.set(
          'No se pudo eliminar al alumno. Recarga el listado e inténtalo nuevamente.'
        );
        this.eliminando.set(null);
      }
    });
  }
}