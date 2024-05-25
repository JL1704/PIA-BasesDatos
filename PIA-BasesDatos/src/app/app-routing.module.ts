import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) // Cambiar la ruta predeterminada al módulo de login
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) // Ruta para tabs
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'crear-eventos',
    loadChildren: () => import('./crear-eventos/crear-eventos.module').then(m => m.CrearEventosPageModule)
  },
  {
    path: 'eventos-registrados',
    loadChildren: () => import('./eventos-registrados/eventos-registrados.module').then(m => m.EventosRegistradosPageModule)
  },
  {
    path: 'eventos-creados',
    loadChildren: () => import('./eventos-creados/eventos-creados.module').then(m => m.EventosCreadosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}

