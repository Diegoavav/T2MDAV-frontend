import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.html',
  styleUrl: './productos.scss'
})
export class Productos implements OnInit {
  private api = inject(ApiService);

  productos = signal<Producto[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.api.listarProductos().subscribe({
      next: (datos) => {
        this.productos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(
          'No se pudieron cargar los productos. Verifica que el backend esté funcionando.'
        );
        this.cargando.set(false);
      }
    });
  }
}