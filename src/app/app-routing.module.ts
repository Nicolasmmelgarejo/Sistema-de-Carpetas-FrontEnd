import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SingInComponent } from './components/sing-in/sing-in.component';
import { CarpetasComponent } from './components/carpetas/carpetas.component';
import { CrearcarpetaComponent } from './components/crearcarpeta/crearcarpeta.component';
import { DocumentoComponent } from './components/carpetas/documento/documento.component';
import { EditarArchivoComponent } from './components/carpetas/editar-archivo/editar-archivo.component';
import { CarpetascontenedorComponent } from './components/carpetas/carpetascontenedor/carpetascontenedor.component';
import { ListcarpetasComponent } from './components/carpetas/listcarpetas/listcarpetas.component';
import { EditCarComponent } from './components/carpetas/edit-car/edit-car.component';
import { AuthGuard } from './services/auth.guard';
import { NoAuthGuardGuard } from './services/no-auth-guard.guard';
import { VistausuariosComponent } from './components/vistausuarios/vistausuarios.component';
import { NoAdminAuthGuard } from './services/no-admin-auth.guard';

const routes: Routes=[
  {
    path: 'login',
    component: LogInComponent,
    canActivate: [NoAuthGuardGuard]
  },
  {
    path: 'singin',
    component: SingInComponent,
    canActivate: [NoAdminAuthGuard]
  },
  {
    path: 'verusuarios',
    component: VistausuariosComponent,
    canActivate: [NoAdminAuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: 'editCar',
    component: EditCarComponent,
    canActivate: [NoAdminAuthGuard]
  },
  {
    path: 'carpetas',
    component: CarpetasComponent,
    children: [
      { path: 'editar', component:EditarArchivoComponent,
      canActivate: [NoAdminAuthGuard] },
      { path: 'contenedor', component: CarpetascontenedorComponent },
      { path: 'lista', component: ListcarpetasComponent}
    ],
    canActivate: [AuthGuard]
  },
  {
    path:'crear-carpeta',
    component: CrearcarpetaComponent,
    canActivate: [NoAdminAuthGuard]
  },
  {
    path:'crear-documento',
    component: DocumentoComponent,
    canActivate: [NoAdminAuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: "full"
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
