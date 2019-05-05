import ClientDashboardView from './ClientDashboardView';
import ClientView from './ClientView';

export const ClientDashboardRoutes = [
  {
    path: '/dashboard/client',
    exact: true,
    component: ClientDashboardView
  },
  {
    path: '/dashboard/client/:id',
    exact: true,
    component: ClientView
  }
];
