import { Component, OnInit, OnDestroy, ElementRef, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare const VANTA: any;

@Component({
  selector: 'app-tarifario',
  imports: [],
  templateUrl: './tarifario.html',
  styleUrl: './tarifario.css'
})
export class TarifarioComponent implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private vantaEffect: any;
  anio = new Date().getFullYear();

  modalAbierto = signal(false);
  imagenActual = signal(0);
  zoomActivo = signal(false);

  imagenes = [
  '/ctarifarios/ctarifarios1.png',
  '/ctarifarios/ctarifarios2.png',
  '/ctarifarios/ctarifarios3.png',
  '/ctarifarios/ctarifarios4.png',
  '/ctarifarios/ctarifarios5.png',
  '/ctarifarios/ctarifarios6.png',
  '/ctarifarios/ctarifarios7.png',
];

  pasos = [
    {
      num: '01',
      titulo: 'Selección de carrera',
      desc: 'El usuario selecciona una o múltiples carreras disponibles en la institución para aplicar el tarifario.'
    },
    {
      num: '02',
      titulo: 'Selección de sucursal',
      desc: 'Se eligen las sucursales donde aplica el tarifario, permitiendo configuraciones por sede.'
    },
    {
      num: '03',
      titulo: 'Selección de modalidad',
      desc: 'Se define la modalidad de estudio: presencial, semipresencial o en línea.'
    },
    {
      num: '04',
      titulo: 'Configuración de valores',
      desc: 'Se ingresan los valores de matrícula, cuotas y otros conceptos de pago para la combinación seleccionada.'
    },
    {
      num: '05',
      titulo: 'Generación del tarifario',
      desc: 'El sistema genera y guarda el tarifario aplicable a todas las combinaciones seleccionadas de forma masiva.'
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