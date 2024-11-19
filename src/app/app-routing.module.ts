import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'perfilusuario',
    loadChildren: () => import('./pages/perfilusuario/perfilusuario.module').then( m => m.PerfilusuarioPageModule)
  },
  {
    path: 'feed',
    loadChildren: () => import('./pages/feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'todos-los-libros',
    loadChildren: () => import('./pages/todos-los-libros/todos-los-libros.module').then( m => m.TodosLosLibrosPageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./admin/administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: 'recuperar-contra',
    loadChildren: () => import('./pages/recuperar-contra/recuperar-contra.module').then( m => m.RecuperarContraPageModule)
  },
  {
    path: 'modificar-perfil-usuario',
    loadChildren: () => import('./pages/modificar-perfil-usuario/modificar-perfil-usuario.module').then( m => m.ModificarPerfilUsuarioPageModule)
  },
  {
    path: 'ver-libros-admin',
    loadChildren: () => import('./admin/ver-libros-admin/ver-libros-admin.module').then( m => m.VerLibrosAdminPageModule)
  },
  {
    path: 'anadir-libros-admin',
    loadChildren: () => import('./admin/anadir-libros-admin/anadir-libros-admin.module').then( m => m.AnadirLibrosAdminPageModule)
  },
  {
    path: 'libros-estrenos',
    loadChildren: () => import('./pages/libros-estrenos/libros-estrenos.module').then( m => m.LibrosEstrenosPageModule)
  },
  {
    path: 'cambiar-contra',
    loadChildren: () => import('./pages/cambiar-contra/cambiar-contra.module').then( m => m.CambiarContraPageModule)
  },
  {
    path: 'acercade',
    loadChildren: () => import('./pages/acercade/acercade.module').then( m => m.AcercadePageModule)
  },
  {
    path: 'recomendaciones',
    loadChildren: () => import('./pages/recomendaciones/recomendaciones.module').then( m => m.RecomendacionesPageModule)
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'gestion-comentario-libro',
    loadChildren: () => import('./admin/gestion-comentario-libro/gestion-comentario-libro.module').then( m => m.GestionComentarioLibroPageModule)
  },

  {
    path: 'detalleslibro',
    loadChildren: () => import('./pages/detalleslibro/detalleslibro.module').then( m => m.DetalleslibroPageModule)
  },
  {
    path: 'gestion-usuario-admin',
    loadChildren: () => import('./admin/gestion-usuario-admin/gestion-usuario-admin.module').then( m => m.GestionUsuarioAdminPageModule)

  },
  {
    path: 'cadacategoria',
    loadChildren: () => import('./pages/cadacategoria/cadacategoria.module').then( m => m.CadacategoriaPageModule)
  },
  {
    path: 'libros-guardados-detalles',
    loadChildren: () => import('./pages/libros-guardados-detalles/libros-guardados-detalles.module').then( m => m.LibrosGuardadosDetallesPageModule)
  },
  {
    path: 'resenas',
    loadChildren: () => import('./pages/resenas/resenas.module').then( m => m.ResenasPageModule)
  },
  {
    path: 'recomendaciones-admin',
    loadChildren: () => import('./admin/recomendaciones-admin/recomendaciones-admin.module').then( m => m.RecomendacionesAdminPageModule)
  },
  {
    path: 'detalle-libro-estrenos/:id',
    loadChildren: () => import('./pages/detalle-libro-estrenos/detalle-libro-estrenos.module').then( m => m.DetalleLibroEstrenosPageModule)
  },
  {
    path: 'gestion-categorias-admin',
    loadChildren: () => import('./admin/gestion-categorias-admin/gestion-categorias-admin.module').then( m => m.GestionCategoriasAdminPageModule)
  },
  {
    path: 'resena-usuario',
    loadChildren: () => import('./pages/resena-usuario/resena-usuario.module').then( m => m.ResenaUsuarioPageModule)
  },
  {
    path: 'modificar-contra-usuario',
    loadChildren: () => import('./pages/modificar-contra-usuario/modificar-contra-usuario.module').then( m => m.ModificarContraUsuarioPageModule)
  },
  {
    path: 'enviarcodigo',
    loadChildren: () => import('./pages/enviarcodigo/enviarcodigo.module').then( m => m.EnviarcodigoPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },

  
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
