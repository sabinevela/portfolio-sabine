import { Component, OnInit, OnDestroy, inject, signal, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare const VANTA: any;

@Component({
  selector: 'app-splash',
  imports: [],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent implements OnInit, AfterViewInit, OnDestroy {
  private router = inject(Router);
  private el     = inject(ElementRef);

  saliendo      = signal(false);
  progreso      = signal(0);
  textoDinamico = signal('');
  cursorVisible = signal(true);

  private vantaEffect: any;

  private readonly frases = [
    'const sabine = new Developer()',
    'skills.push("Angular", "Spring")',
    'git commit -m "building dreams"',
    'npm run build --production',
  ];

  private fraseIdx = 0;
  private charIdx  = 0;
  private borrando = false;
  private pausado  = false;

  private tTyping?:   ReturnType<typeof setTimeout>;
  private tCerrar?:   ReturnType<typeof setTimeout>;
  private iProgreso?: ReturnType<typeof setInterval>;
  private iCursor?:   ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.iniciarProgreso();
    this.iniciarCursor();
    setTimeout(() => this.typing(), 1200);
    this.tCerrar = setTimeout(() => this.cerrar(), 4000);
  }

  ngAfterViewInit(): void {
    const initVanta = () => {
      if (typeof VANTA !== 'undefined' && typeof (window as any).THREE !== 'undefined') {
        this.vantaEffect = VANTA.NET({
          el: this.el.nativeElement.querySelector('.splash'),
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
          points: 12.0,
          maxDistance: 20.0,
          spacing: 18.0,
          showDots: true,
        });
      } else {
        setTimeout(initVanta, 100);
      }
    };
    setTimeout(initVanta, 300);
  }

  private iniciarProgreso(): void {
    let prog = 0;
    this.iProgreso = setInterval(() => {
      const paso = prog < 70 ? Math.random() * 4 + 2 : Math.random() * 1.5 + 0.5;
      prog = Math.min(100, prog + paso);
      this.progreso.set(Math.round(prog));
      if (Math.round(prog) >= 100) clearInterval(this.iProgreso);
    }, 100);
  }

  private iniciarCursor(): void {
    this.iCursor = setInterval(() => this.cursorVisible.set(!this.cursorVisible()), 650);
  }

  private typing(): void {
    if (this.pausado) return;
    const frase = this.frases[this.fraseIdx];

    if (!this.borrando) {
      this.charIdx++;
      this.textoDinamico.set(frase.slice(0, this.charIdx));
      if (this.charIdx === frase.length) {
        this.pausado = true;
        this.tTyping = setTimeout(() => {
          this.pausado  = false;
          this.borrando = true;
          this.typing();
        }, 2000);
        return;
      }
      this.tTyping = setTimeout(() => this.typing(), 55 + Math.random() * 30);
    } else {
      this.charIdx--;
      this.textoDinamico.set(frase.slice(0, this.charIdx));
      if (this.charIdx === 0) {
        this.borrando = false;
        this.fraseIdx = (this.fraseIdx + 1) % this.frases.length;
        this.tTyping  = setTimeout(() => this.typing(), 400);
        return;
      }
      this.tTyping = setTimeout(() => this.typing(), 25 + Math.random() * 15);
    }
  }

 cerrar(): void {
  if (this.saliendo()) return;
  this.saliendo.set(true);
  clearInterval(this.iProgreso);
  clearInterval(this.iCursor);
  clearTimeout(this.tTyping);
  clearTimeout(this.tCerrar);
  // Destruye Vanta DESPUÉS de que termine la transición, no antes
  setTimeout(() => {
    if (this.vantaEffect) this.vantaEffect.destroy();
    this.router.navigate(['/inicio']);
  }, 700);
}

  ngOnDestroy(): void {
    clearInterval(this.iProgreso);
    clearInterval(this.iCursor);
    clearTimeout(this.tTyping);
    clearTimeout(this.tCerrar);
    if (this.vantaEffect) this.vantaEffect.destroy();
  }
}