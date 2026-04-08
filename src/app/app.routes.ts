import { Routes } from '@angular/router';
import { authGuardsGuard } from './core/guards/auth-guards-guard';
import { nothGuardGuard } from './core/guards/noth-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    loadComponent: () => import('./core/layout/layout-auth/layout-auth').then((m) => m.LayoutAuth),
    canActivate: [nothGuardGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./core/auth/login/login').then((m) => m.Login),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () => import('./core/auth/register/register').then((m) => m.Register),
        title: 'register',
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./core/layout/layout-blank/layout-blank').then((m) => m.LayoutBlank),
    canActivate: [authGuardsGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
        title: 'home',
        children: [
          { path: '', redirectTo: 'singlPost', pathMatch: 'full' },
          {
            path: 'myPosts',
            loadComponent: () =>
              import('./shared/components/my-posts/my-posts').then((m) => m.MyPosts),
          },
          {
            path: 'feed',
            loadComponent: () => import('./shared/components/feed/feed/feed').then((m) => m.Feed),
          },
          {
            path: 'singlPost',
            loadComponent: () =>
              import('./shared/components/singl-post/singl-post').then((m) => m.SinglPost),
          },
          {
            path: 'saved',
            loadComponent: () => import('./shared/components/saved/saved').then((m) => m.Saved),
          },
        ],
      },
      {
        path: 'profil',
        loadComponent: () => import('./features/profil/profil/profil').then((m) => m.Profil),
        title: 'profil',
      },
      {
        path: 'Notifications',
        loadComponent: () =>
          import('./features/Notifications/notifications/notifications').then(
            (m) => m.Notifications,
          ),
        title: 'Notifications',
      },
      {
        path: 'setting',
        loadComponent: () =>
          import('./shared/components/settings/setting/setting').then((m) => m.Setting),
        title: 'Notifications',
      },
      {
        path: 'postDetails/:id',
        loadComponent: () =>
          import('./features/home/post-details/post-details').then((m) => m.PostDetails),
        title: 'post Details',
      },
    ],
  },
];
