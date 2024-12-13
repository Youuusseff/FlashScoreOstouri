import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CarsComponent } from './pages/cars/cars.component';
import { BookingComponent } from './pages/booking/booking.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'cars',
        component: CarsComponent,
      },
      {
        path: 'booking',
        component: BookingComponent,
      },
      {
        path: '**',
        redirectTo: 'cars',
        pathMatch: 'full',
      }
    ],
  },
];
