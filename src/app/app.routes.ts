import { Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { InicioComponent } from './inicio/inicio.component';
import { RequisicionComponent } from './proyectos/requisicion/requisicion';
import { RefinanciamientoComponent } from './proyectos/refinanciamiento/refinanciamiento';
import { TarifarioComponent } from './proyectos/tarifario/tarifario';
import { TarifarioConvenioComponent } from './proyectos/tarifario-convenio/tarifario-convenio';



export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'proyectos/requisicion', component: RequisicionComponent },
  { path: 'proyectos/refinanciamiento', component: RefinanciamientoComponent },
  { path: 'proyectos/tarifario', component: TarifarioComponent },
  { path: 'proyectos/tarifario-convenio', component: TarifarioConvenioComponent },
  { path: '**', redirectTo: '' },
];