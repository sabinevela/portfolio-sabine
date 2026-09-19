import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent implements OnInit {
  private router = inject(Router);
  saliendo = signal(false);

  ngOnInit(): void {
    setTimeout(() => this.cerrar(), 3500);
  }

  cerrar(): void {
    if (this.saliendo()) return;
    this.saliendo.set(true);
    setTimeout(() => this.router.navigate(['/inicio']), 700);
  }
}