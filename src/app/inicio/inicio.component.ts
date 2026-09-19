import { Component } from '@angular/core';

interface Proyecto {
  titulo: string;
  descripcion: string;
  tecnologias: string[];
}

interface GrupoHabilidades {
  titulo: string;
  items: string[];
}

interface Enfoque {
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  anio = new Date().getFullYear();

  enfoques: Enfoque[] = [
    {
      titulo: 'Interfaces',
      descripcion: 'Pantallas claras y funcionales, desde WebForms hasta Angular.'
    },
    {
      titulo: 'Base de datos',
      descripcion: 'Lógica de datos en procedimientos almacenados de SQL Server.'
    },
    {
      titulo: 'Arquitectura',
      descripcion: 'Capas separadas de Datos, Negocio y Presentación para un código ordenado y mantenible.'
    }
  ];

  habilidades: GrupoHabilidades[] = [
    { titulo: 'Backend', items: ['C#', 'ASP.NET WebForms', 'Arquitectura en capas'] },
    { titulo: 'Base de datos', items: ['SQL Server', 'Procedimientos almacenados', 'PostgreSQL'] },
    { titulo: 'Frontend', items: ['Angular', 'TypeScript', 'HTML', 'CSS'] }
  ];

  proyectos: Proyecto[] = [
    {
      titulo: 'Módulo de pagos y crédito educativo',
      descripcion: 'Desarrollo de funcionalidades de pagos y crédito educativo para un sistema de gestión académica, con lógica en procedimientos almacenados.',
      tecnologias: ['C#', 'ASP.NET WebForms', 'SQL Server']
    },
    {
      titulo: 'Módulo de contratos de personal',
      descripcion: 'Gestión de contratos del personal y corrección de validaciones de becas en un sistema de talento humano.',
      tecnologias: ['C#', 'ASP.NET WebForms', 'SQL Server']
    },
    {
      titulo: 'Registro de asistencia',
      descripcion: 'Componente que permite marcar la asistencia de todo un curso de forma masiva desde un modal.',
      tecnologias: ['Angular', 'TypeScript']
    },
    {
      titulo: 'Migración de módulos a Angular',
      descripcion: 'Migración de módulos desde un sistema ASP.NET antiguo hacia una arquitectura con frontend en Angular.',
      tecnologias: ['Angular', 'ASP.NET', 'PostgreSQL']
    }
  ];

  ir(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}