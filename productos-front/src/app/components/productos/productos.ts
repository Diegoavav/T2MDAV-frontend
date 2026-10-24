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
  errorEliminar = signal('');
  eliminando = signal<number | null>(null);

  ngOnInit(): void {
    this.api.listarProductos().subscribe({
      next: (datos) => {
        this.productos.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(
          'No se pudieron cargar los productos. Revisa el backend.'
        );
        this.cargando.set(false);
      }
    });
  }

  eliminar(producto: Producto): void {
    if (this.eliminando() !== null) {
      return;
    }

    if (!confirm(`¿Deseas eliminar el producto ${producto.nombre}?`)) {
      return;
    }

    this.errorEliminar.set('');
    this.eliminando.set(producto.id);

    this.api.eliminarProducto(producto.id).subscribe({
      next: () => {
        this.productos.update(lista =>
          lista.filter(item => item.id !== producto.id)
        );
        this.eliminando.set(null);
      },
      error: () => {
        this.errorEliminar.set(
          'No se pudo eliminar el producto. Recarga el listado e inténtalo nuevamente.'
        );
        this.eliminando.set(null);
      }
    });
  }
}