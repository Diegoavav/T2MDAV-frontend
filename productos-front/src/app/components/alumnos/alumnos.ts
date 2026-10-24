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

  ngOnInit(): void {
    this.api.listarAlumnos().subscribe({
      next: (datos) => {
        this.alumnos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(
          'No se pudieron cargar los alumnos. Verifica que el backend esté funcionando.'
        );
        this.cargando.set(false);
      }
    });
  }
}