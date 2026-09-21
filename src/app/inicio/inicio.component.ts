import { Component, OnInit, OnDestroy, ElementRef, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

declare const VANTA: any;

interface Proyecto { num: string; titulo: string; descripcion: string; tecnologias: string[]; imagenes: string[]; ruta?: string; }
interface GrupoHabilidades { icono: string; titulo: string; items: string[]; }
interface Enfoque { icono: string; titulo: string; descripcion: string; }

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private vantaEffect: any;
  router = inject(Router);
  anio = new Date().getFullYear();
  proyectosAbiertos = signal(false);
  letrasBtn = ['<', '/', '>', '{', '}', '(', ')', ';', '=', '+'];



  modalAbierto = signal(false);
  imagenActual = signal(0);
  imagenesModal = signal<string[]>([]);
  zoomActivo = signal(false);
  proyectoActual = signal(0);

  enfoques: Enfoque[] = [
    { icono: '◈', titulo: 'Frontend',      descripcion: 'Interfaces modernas y responsivas con Angular y React.' },
    { icono: '◎', titulo: 'Backend',       descripcion: 'APIs robustas con Spring Boot, .NET y arquitectura en capas.' },
    { icono: '◉', titulo: 'Base de datos', descripcion: 'SQL Server, PostgreSQL, MySQL y Firebase.' },
    { icono: '◐', titulo: 'Mobile',        descripcion: 'Aplicaciones móviles con Flutter.' },
  ];

  habilidades: GrupoHabilidades[] = [
    { icono: '⬡', titulo: 'Frontend',      items: ['Angular', 'React', 'TypeScript', 'HTML', 'CSS', 'Flutter'] },
    { icono: '⬡', titulo: 'Backend',       items: ['Spring Boot', '.NET Core', 'ASP.NET', 'C#', 'Java'] },
    { icono: '⬡', titulo: 'Base de datos', items: ['SQL Server', 'PostgreSQL', 'MySQL', 'Firebase'] },
    { icono: '⬡', titulo: 'Herramientas', items: ['Git', 'GitHub', 'Docker', 'Postman', 'Figma'] },
  ];

  proyectos: Proyecto[] = [
    {
      num: '01',
      titulo: 'Requisición',
      descripcion: 'Desarrollé un módulo completo de requisición de personal dentro de un sistema académico institucional. El flujo incluye creación de la solicitud, aprobación multinivel, notificaciones automáticas por correo y trazabilidad total del proceso.',
      tecnologias: ['C#', 'ASP.NET WebForms', 'SQL Server'],
      imagenes: [
        '/requisicion/requisicion1.jpg',
        '/requisicion/requisicion2.jpg',
        '/requisicion/requisicion3.jpg',
        '/requisicion/requisicion4.jpg',
        '/requisicion/requisicion5.jpg',
        '/requisicion/requisicion6.jpg',
        '/requisicion/requisicion7.jpg',
        '/requisicion/requisicion8.jpg',
        '/requisicion/requisicion9.jpg',
        '/requisicion/requisicion10.jpg',
        '/requisicion/requisicion11.jpg',
        '/requisicion/requisicion12.jpg',
        '/requisicion/requisicion13.jpg',
      ],
      ruta: '/proyectos/requisicion'
    },
    {
  num: '02',
  titulo: 'Refinanciamiento Estudiantil',
  descripcion: 'Sistema de gestión de cartera que permite consolidar múltiples cuotas estudiantiles vencidas en un único plan de pago personalizado, con anulación automática de cuotas originales.',
  tecnologias: ['C#', 'ASP.NET WebForms', 'SQL Server'],
  imagenes: [
    '/refinanciamiento/ref1.png',
    '/refinanciamiento/ref2.png',
    '/refinanciamiento/ref3.png',
    '/refinanciamiento/ref4.png',
    '/refinanciamiento/ref5.png',
    '/refinanciamiento/ref6.png',
    '/refinanciamiento/ref7.png',
  ],
  ruta: '/proyectos/refinanciamiento'
},
    {
  num: '03',
  titulo: 'Creación de Tarifarios',
  descripcion: 'Módulo de SISACAD que permite crear tarifarios académicos de forma masiva, seleccionando múltiples combinaciones de carreras, sucursales y modalidades en una sola operación.',
  tecnologias: ['Angular', '.NET Core 8', 'PostgreSQL', 'TypeScript'],
  imagenes : [
  '/ctarifarios/ctarifarios1.png',
  '/ctarifarios/ctarifarios2.png',
  '/ctarifarios/ctarifarios3.png',
  '/ctarifarios/ctarifarios4.png',
  '/ctarifarios/ctarifarios5.png',
  '/ctarifarios/ctarifarios6.png',
  '/ctarifarios/ctarifarios7.png',
],
  ruta: '/proyectos/tarifario'
},
   {
  num: '04',
  titulo: 'Tarifarios por Convenio',
  descripcion: 'Módulo de SISACAD para crear tarifarios con condiciones especiales para estudiantes beneficiarios de convenios institucionales, con selección masiva de carreras, sucursales y modalidades.',
  tecnologias: ['Angular', '.NET Core 8', 'PostgreSQL', 'TypeScript'],
imagenes:  [
    '/conveniost/tarifariosc1.png',
    '/conveniost/tarifariosc2.png',
    '/conveniost/tarifariosc3.png',
    '/conveniost/tarifariosc4.png',
  ],    ruta: '/proyectos/tarifario-convenio'
},
  ];

  navegarProyecto(proyecto: Proyecto, i: number): void {
    if (proyecto.ruta) {
      this.router.navigate([proyecto.ruta]);
    } else {
      this.abrirModal(proyecto.imagenes, 0, i);
    }
  }
letrasProyecto = Array.from({ length: 18 }, (_, i) => ({
  char: ['<', '/>', '{', '}', '()', ';', '=', '+', '✦', '◈', '♥', '★'][i % 12],
  x: Math.floor(Math.random() * 100),
  y: Math.floor(Math.random() * 100),
}));

toggleProyectos(): void {
  this.proyectosAbiertos.set(!this.proyectosAbiertos());
}
  abrirModal(imagenes: string[], indice: number, proyectoIdx: number): void {
    this.imagenesModal.set(imagenes);
    this.imagenActual.set(indice);
    this.proyectoActual.set(proyectoIdx);
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
    const total = this.imagenesModal().length;
    this.imagenActual.set((this.imagenActual() + 1) % total);
    this.zoomActivo.set(false);
  }

  anterior(): void {
    const total = this.imagenesModal().length;
    this.imagenActual.set((this.imagenActual() - 1 + total) % total);
    this.zoomActivo.set(false);
  }

  toggleZoom(): void {
    this.zoomActivo.set(!this.zoomActivo());
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

  ir(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}