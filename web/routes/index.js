import { DashboardRoute } from './Dashboard';
import { NotFoundRoute } from './NotFound';
import { LogDashboardRoute } from './Dashboard/LogDashboard';
import { HomeRoute } from './Home';
import { ClientDashboardRoute } from './Dashboard/ClientDashboard';

export const routes = [
  HomeRoute,
  DashboardRoute,
  LogDashboardRoute,
  ClientDashboardRoute,
  NotFoundRoute
];
