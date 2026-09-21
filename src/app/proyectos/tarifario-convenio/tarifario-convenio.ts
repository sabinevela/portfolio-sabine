import { Component, OnInit, OnDestroy, ElementRef, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare const VANTA: any;

@Component({
  selector: 'app-tarifario-convenio',
  imports: [],
  templateUrl: './tarifario-convenio.html',
  styleUrl: './tarifario-convenio.css'
})
export class TarifarioConvenioComponent implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private vantaEffect: any;
  anio = new Date().getFullYear();

  modalAbierto = signal(false);
  imagenActual = signal(0);
  zoomActivo = signal(false);

imagenes: string[] = [
    '/conveniost/tarifariosc1.png',
    '/conveniost/tarifariosc2.png',
    '/conveniost/tarifariosc3.png',
    '/conveniost/tarifariosc4.png',
  ];
  pasos = [
    {
      num: '01',
      titulo: 'Selección del convenio',
      desc: 'Se selecciona el convenio institucional vigente que aplicará descuentos o condiciones especiales al tarifario.'
    },
    {
      num: '02',
      titulo: 'Selección de carrera, sucursal y modalidad',
      desc: 'Se eligen las combinaciones de carreras, sucursales y modalidades a las que aplica el convenio.'
    },
    {
      num: '03',
      titulo: 'Configuración de valores del convenio',
      desc: 'Se definen los valores especiales: porcentajes de descuento, montos fijos o condiciones particulares del convenio.'
    },
    {
      num: '04',
      titulo: 'Generación masiva',
      desc: 'El sistema genera todos los tarifarios por convenio para las combinaciones seleccionadas de forma automática.'
    },
    {
      num: '05',
      titulo: 'Vinculación al estudiante',
      desc: 'Los tarifarios generados quedan disponibles para ser asignados a estudiantes beneficiarios del convenio.'
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