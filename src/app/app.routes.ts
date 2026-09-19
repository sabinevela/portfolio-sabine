import { Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { InicioComponent } from './inicio/inicio.component';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'inicio', component: InicioComponent },
  { path: '**', redirectTo: '' }
];