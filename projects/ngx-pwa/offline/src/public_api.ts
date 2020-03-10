/*
 * Public API Surface of offline
 */

export {
  OfflineProvidersConfig, offlineProviders,
  OFFLINE_GUARDS_REDIRECT, OFFLINE_ROUTE_OFFLINE, OFFLINE_ROUTE_UNAVAILABLE
} from './lib/tokens';
export { Network, catchOffline } from './lib/network.service';
export { OnlineGuard } from './lib/online.guard';
export { OfflineModule } from './lib/offline.module';
