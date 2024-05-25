import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'crear-eventos',
        loadChildren: () => import('../crear-eventos/crear-eventos.module').then(m => m.CrearEventosPageModule)
      },
      {
        path: 'eventos-registrados',
        loadChildren: () => import('../eventos-registrados/eventos-registrados.module').then(m => m.EventosRegistradosPageModule)
      },
      {
        path: 'eventos-creados',
        loadChildren: () => import('../eventos-creados/eventos-creados.module').then(m => m.EventosCreadosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  }, 
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

