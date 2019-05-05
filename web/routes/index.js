import { DashboardRoute } from './Dashboard';
import { NotFoundRoute } from './NotFound';
import { LogDashboardRoute } from './Dashboard/LogDashboard';
import { HomeRoute } from './Home';
import { ClientDashboardRoutes } from './Dashboard/ClientDashboard';

export const routes = [
  HomeRoute,
  DashboardRoute,
  LogDashboardRoute,
  ...ClientDashboardRoutes,
  NotFoundRoute
];
