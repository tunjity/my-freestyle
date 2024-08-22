import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path?: string;
  title?: string;
  icon?: string;
  class?: string;
  children?: RouteInfo[];  // Add support for child routes
  loadChildren?: () => any; // For lazy loading modules
  loadComponent?: () => any; // For lazy loading components
  data?: any;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: '' },
  { path: '/user', title: 'User Profile', icon: 'pe-7s-user', class: '' },
  { path: '/table', title: 'Table List', icon: 'pe-7s-note2', class: '' },
  {
      title: 'Pages', icon: 'pe-7s-folder', class: '',
      children: [
          {
              path: 'pages', loadChildren: () =>
                  import('../pages/pageRoutes').then((m) => m.routes)
          }
      ]
  },
  {
      path: 'login',
      loadComponent: () => import('../pages/login/login.component').then(m => m.LoginComponent),
      data: {
          title: 'Login Page'
      }
  },
  // More routes can be added here
];

// export const ROUTES: RouteInfo[] = [
//     { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
//     { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
//     { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
//     {children:[
//       { path: 'pages', 
//         loadChildren: () => import('../pages/pageRoutes').then((m) => m.routes)
//       }
//     ]},
    
//     {
//       path: 'login',
//       loadComponent: () => import('../pages/login/login.component').then(m => m.LoginComponent),
//       data: {
//         title: 'Login Page'
//       }
//     },
//     // { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
//     // { path: '/pages', title: 'Icons',  icon:'pe-7s-science', class: '' },
//     // {
//     //   path: 'pages',
//     //   loadChildren: () => import('../pages/pageRoutes').then((m) => m.routes)
//     // }
//     // { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
//     // { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
//     // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' },

//   ];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
