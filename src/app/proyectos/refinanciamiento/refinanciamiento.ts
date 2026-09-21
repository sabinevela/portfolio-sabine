import { Component, OnInit, OnDestroy, ElementRef, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare const VANTA: any;

@Component({
  selector: 'app-refinanciamiento',
  imports: [],
  templateUrl: './refinanciamiento.html',
  styleUrl: './refinanciamiento.css'
})
export class RefinanciamientoComponent implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private vantaEffect: any;
  anio = new Date().getFullYear();

  modalAbierto = signal(false);
  imagenActual = signal(0);
  zoomActivo = signal(false);

  imagenes: string[] = [
    '/refinanciamiento/ref1.png',
    '/refinanciamiento/ref2.png',
    '/refinanciamiento/ref3.png',
    '/refinanciamiento/ref4.png',
    '/refinanciamiento/ref5.png',
    '/refinanciamiento/ref6.png',
    '/refinanciamiento/ref7.png',
  ];
  pasos = [
    {
      num: '01',
      titulo: 'Búsqueda del estudiante',
      desc: 'El gestor de cartera busca al estudiante en el sistema y accede a su historial de cuotas pendientes.'
    },
    {
      num: '02',
      titulo: 'Selección de cuotas',
      desc: 'Se seleccionan las cuotas próximas a vencer, el sistema calcula automáticamente el total acumulado.'
    },
    {
      num: '03',
      titulo: 'Configuración del plan',
      desc: 'Se elige el mes de inicio, fechas de pago y número de cuotas para el nuevo plan de refinanciamiento.'
    },
    {
      num: '04',
      titulo: 'Generación del refinanciamiento',
      desc: 'Todas las cuotas seleccionadas se consolidan en una sola deuda dividida en cuotas mensuales acordadas.'
    },
    {
      num: '05',
      titulo: 'Anulación automática',
      desc: 'Las cuotas originales se anulan automáticamente en el sistema, reemplazadas por la nueva cuota consolidada.'
    },
  ];

  particulas = Array.from({ length: 24 }, (_, i) => ({
    char: ['<', '/>', '{', '}', '✦', '◈', '♥', '★', ';', '$'][i % 10],
    x: Math.random() * 100,
    y: Math.random() * 100,
    d: 3 + Math.random() * 5,
    delay: Math.random() * 5,
    size: 0.65 + Math.random() * 0.5,
  }));

  abrirModal(indice: number): void {
    this.imagenActual.set(indice);
    this.modalAbierto.set(true);
    this.zoomActivo.set(false);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  cerrarModal(): void {
    this.modalAbierto.set(false);
    this.zoomActivo.set(false);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  siguiente(): void {
    this.imagenActual.set((this.imagenActual() + 1) % this.imagenes.length);
    this.zoomActivo.set(false);
  }

  anterior(): void {
    this.imagenActual.set((this.imagenActual() - 1 + this.imagenes.length) % this.imagenes.length);
    this.zoomActivo.set(false);
  }

  toggleZoom(): void {
    this.zoomActivo.set(!this.zoomActivo());
  }

  volver(): void {
    this.router.navigate(['/inicio']);
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const initVanta = () => {
      if (typeof VANTA !== 'undefined' && typeof (window as any).THREE !== 'undefined') {
        this.vantaEffect = VANTA.NET({
          el: this.el.nativeElement.querySelector('#fondo-vanta'),
          THREE: (window as any).THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xffb6c1,
          backgroundColor: 0xfff5f7,
          points: 10.0,
          maxDistance: 22.0,
          spacing: 20.0,
          showDots: true,
        });
      } else {
        setTimeout(initVanta, 100);
      }
    };
    setTimeout(initVanta, 300);
  }

  ngOnDestroy(): void {
    if (this.vantaEffect) this.vantaEffect.destroy();
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}